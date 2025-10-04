import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, FileText } from "lucide-react";
import { toast } from "sonner";

const ResumeScore = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    match_score: number;
    insights: {
      strengths: string[];
      weaknesses: string[];
      recommendations: string[];
    };
    missing_keywords: string[];
  } | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast.error("Please provide both resume and job description");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("score-resume", {
        body: {
          resumeText,
          jobDescription,
        },
      });

      if (error) {
        throw error;
      }

      setResult(data);
      toast.success("Analysis complete!");
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      if (error.message?.includes("429")) {
        toast.error("Rate limit exceeded. Please try again later.");
      } else if (error.message?.includes("402")) {
        toast.error("Payment required. Please add credits to your workspace.");
      } else {
        toast.error("Error analyzing resume. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Match";
    if (score >= 40) return "Fair Match";
    return "Poor Match";
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Resume Scoring</h2>
        <p className="text-muted-foreground mt-2">
          Get AI-powered analysis of how well your resume matches a job description
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Your Resume
            </CardTitle>
            <CardDescription>Paste your resume text or key highlights</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here... Include key experiences, skills, education, etc."
              rows={12}
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Job Description
            </CardTitle>
            <CardDescription>Paste the job description you're applying for</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here... Include responsibilities, requirements, qualifications, etc."
              rows={12}
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleAnalyze}
          disabled={loading}
          size="lg"
          className="gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Analyze Match
            </>
          )}
        </Button>
      </div>

      {result && (
        <Card className="border-2 border-primary/50">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Match Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-lg">Match Score</Label>
                <span className={`text-3xl font-bold ${getScoreColor(result.match_score)}`}>
                  {result.match_score}%
                </span>
              </div>
              <Progress value={result.match_score} className="h-3" />
              <p className="text-sm text-muted-foreground text-center">
                {getScoreLabel(result.match_score)}
              </p>
            </div>

            {/* Strengths */}
            {result.insights.strengths.length > 0 && (
              <div className="space-y-2">
                <Label className="text-base">Strengths</Label>
                <div className="space-y-2">
                  {result.insights.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-success/10 rounded">
                      <span className="text-success">✓</span>
                      <p className="text-sm">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weaknesses */}
            {result.insights.weaknesses.length > 0 && (
              <div className="space-y-2">
                <Label className="text-base">Areas for Improvement</Label>
                <div className="space-y-2">
                  {result.insights.weaknesses.map((weakness, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-warning/10 rounded">
                      <span className="text-warning">!</span>
                      <p className="text-sm">{weakness}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords */}
            {result.missing_keywords.length > 0 && (
              <div className="space-y-2">
                <Label className="text-base">Missing Keywords</Label>
                <div className="flex flex-wrap gap-2">
                  {result.missing_keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result.insights.recommendations.length > 0 && (
              <div className="space-y-2">
                <Label className="text-base">Recommendations</Label>
                <div className="space-y-2">
                  {result.insights.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-accent rounded">
                      <span className="text-primary">→</span>
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeScore;