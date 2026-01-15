"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader, Wand2 } from 'lucide-react';
import { getPredictionFromLiveData } from '@/app/actions/predict';

const sensorDataSchema = z.object({
  cycle: z.coerce.number().min(0, { message: 'Cycle must be positive.' }),
  op1: z.coerce.number(),
  op2: z.coerce.number(),
  op3: z.coerce.number(),
  s3: z.coerce.number(),
  s4: z.coerce.number(),
  s9: z.coerce.number(),
  s11: z.coerce.number(),
  s12: z.coerce.number(),
  s13: z.coerce.number(),
  s14: z.coerce.number(),
  s15: z.coerce.number(),
  s20: z.coerce.number(),
});

type PredictionResult = {
  rul: number;
  confidence: number;
  resolutions: string[];
};

const sensorFields = [
  { name: 'cycle', label: 'Cycle' },
  { name: 'op1', label: 'Op Setting 1' },
  { name: 'op2', label: 'Op Setting 2' },
  { name: 'op3', label: 'Op Setting 3' },
  { name: 's3', label: 'Sensor 3' },
  { name: 's4', label: 'Sensor 4' },
  { name: 's9', label: 'Sensor 9' },
  { name: 's11', label: 'Sensor 11' },
  { name: 's12', label: 'Sensor 12' },
  { name: 's13', label: 'Sensor 13' },
  { name: 's14', label: 'Sensor 14' },
  { name: 's15', label: 'Sensor 15' },
  { name: 's20', label: 'Sensor 20' },
] as const;

export default function PredictLivePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof sensorDataSchema>>({
    resolver: zodResolver(sensorDataSchema),
    defaultValues: {
      cycle: 192, op1: -0.0007, op2: -0.0004, op3: 100, s3: 1400.6, s4: 554.36, s9: 9046.73, s11: 47.47, s12: 521.66, s13: 2388.02, s14: 8138.62, s15: 8.4195, s20: 392
    },
  });

  const onSubmit = async (values: z.infer<typeof sensorDataSchema>) => {
    setIsLoading(true);
    setResult(null);

    const predictionResult = await getPredictionFromLiveData(values);
    
    if (predictionResult.error) {
        toast({
            variant: 'destructive',
            title: 'Prediction Failed',
            description: predictionResult.error,
        });
        setResult({
          rul: predictionResult.rul,
          confidence: predictionResult.confidence,
          resolutions: predictionResult.resolutions
        });
    } else {
        setResult({
          rul: predictionResult.rul,
          confidence: predictionResult.confidence,
          resolutions: predictionResult.resolutions
        });
        toast({
            title: 'Prediction Complete',
            description: 'AI-powered analysis is displayed below.',
        });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Predict with Live Data</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Sensor Data</CardTitle>
            <CardDescription>
              Enter the latest readings from the equipment sensors to get a real-time RUL prediction and AI-powered recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sensorFields.map((fieldInfo) => (
                    <FormField
                      key={fieldInfo.name}
                      control={form.control}
                      name={fieldInfo.name as keyof z.infer<typeof sensorDataSchema>}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase font-semibold text-muted-foreground">{fieldInfo.label}</FormLabel>
                          <FormControl>
                            <Input type="number" step="any" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <Button type="submit" disabled={isLoading} className="w-full mt-4">
                  {isLoading ? <><Loader className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : 'Predict RUL'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
            <CardDescription>
              AI-generated analysis will appear here after processing.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p>Generating AI recommendations...</p>
              </div>
            ) : result ? (
              <div className="w-full space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground">Predicted RUL</p>
                    <p className="text-3xl font-bold">{result.rul} <span className="text-lg font-normal">cycles</span></p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="text-3xl font-bold">{(result.confidence * 100).toFixed(1)}%</p>
                  </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Wand2 className="w-5 h-5 text-primary" /> Suggested Resolutions</h3>
                    <ul className="space-y-2 list-disc list-inside bg-secondary p-4 rounded-lg text-sm">
                      {result.resolutions.map((res, index) => (
                        <li key={index}>{res}</li>
                      ))}
                    </ul>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center">Awaiting data submission...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
