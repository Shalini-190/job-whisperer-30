import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sparkles, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface Application {
  id: string;
  company_name: string;
  position_title: string;
  job_description: string | null;
}

const commonQuestions = [
  "Why are you a good fit for this position?",
  "What are your greatest strengths?",
  "Tell me about yourself",
  "Why do you want to work for this company?",
  "What are your salary expectations?",
  "Where do you see yourself in 5 years?",
];

const AIAnswers = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("job_applications")
      .select("id, company_name, position_title, job_description")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching applications:", error);
    } else {
      setApplications(data || []);
    }
  };

  const handleGenerate = async () => {
    if (!selectedApp || !selectedQuestion) {
      toast.error("Please select an application and question");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const app = applications.find(a => a.id === selectedApp);
      if (!app) return;

      const { data, error } = await supabase.functions.invoke("generate-answer", {
        body: {
          question: selectedQuestion,
          jobDescription: app.job_description || `${app.position_title} at ${app.company_name}`,
          companyName: app.company_name,
          position: app.position_title,
        },
      });

      if (error) {
        throw error;
      }

      setAnswer(data.answer);
      toast.success("Answer generated!");
    } catch (error: any) {
      console.error("Error generating answer:", error);
      if (error.message?.includes("429")) {
        toast.error("Rate limit exceeded. Please try again later.");
      } else if (error.message?.includes("402")) {
        toast.error("Payment required. Please add credits to your workspace.");
      } else {
        toast.error("Error generating answer. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    toast.success("Answer copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI-Generated Answers</h2>
        <p className="text-muted-foreground mt-2">
          Generate personalized answers to common interview questions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Answer</CardTitle>
          <CardDescription>Select an application and question to generate a tailored response</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="application">Select Application</Label>
            <Select value={selectedApp} onValueChange={setSelectedApp}>
              <SelectTrigger id="application">
                <SelectValue placeholder="Choose an application" />
              </SelectTrigger>
              <SelectContent>
                {applications.map((app) => (
                  <SelectItem key={app.id} value={app.id}>
                    {app.position_title} at {app.company_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="question">Select Question</Label>
            <Select value={selectedQuestion} onValueChange={setSelectedQuestion}>
              <SelectTrigger id="question">
                <SelectValue placeholder="Choose a question" />
              </SelectTrigger>
              <SelectContent>
                {commonQuestions.map((q, index) => (
                  <SelectItem key={index} value={q}>
                    {q}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !selectedApp || !selectedQuestion}
            className="w-full gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Answer
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {answer && (
        <Card className="border-2 border-primary/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Answer</CardTitle>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <CardDescription>
              {selectedQuestion}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap">{answer}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIAnswers;