"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, File, X, Loader, Wand2 } from 'lucide-react';
import { getPredictionFromCsv } from '@/app/actions/predict';

type PredictionResult = {
  rul: number;
  confidence: number;
  resolutions: string[];
};

export default function PredictCsvPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setResult(null);
  }

  const handleSubmit = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a CSV file to upload.',
      });
      return;
    }
    
    setIsLoading(true);
    setResult(null);

    const predictionResult = await getPredictionFromCsv();

    if (predictionResult.error) {
        toast({
            variant: 'destructive',
            title: 'Prediction Failed',
            description: predictionResult.error,
        });
        // Even if AI fails, show the mock stats with error resolutions
        setResult({
            rul: predictionResult.rul,
            confidence: predictionResult.confidence,
            resolutions: predictionResult.resolutions,
        });
    } else {
        setResult({
            rul: predictionResult.rul,
            confidence: predictionResult.confidence,
            resolutions: predictionResult.resolutions,
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
      <h1 className="text-3xl font-bold tracking-tight">Predict RUL via CSV</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Sensor Data</CardTitle>
            <CardDescription>
              Drag and drop your CSV file or click to browse. The file content is not used in this demo, but the upload triggers the prediction flow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? 'border-primary bg-accent/20' : 'border-border'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv"
                onChange={handleFileChange}
                disabled={isLoading}
              />
              {!file ? (
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2 text-muted-foreground"
                >
                  <UploadCloud className="w-12 h-12" />
                  <p>
                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs">CSV file up to 10MB</p>
                </label>
              ) : (
                <div className="flex flex-col items-center space-y-2 text-foreground">
                  <File className="w-12 h-12 text-primary" />
                  <p className="font-medium">{file.name}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    disabled={isLoading}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              )}
            </div>
            <Button onClick={handleSubmit} disabled={!file || isLoading} className="w-full mt-4">
              {isLoading ? <><Loader className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : 'Predict RUL'}
            </Button>
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
              <p className="text-muted-foreground text-center">Awaiting data upload...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
