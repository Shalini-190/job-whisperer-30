import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Target, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-primary-glow/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10">
      {/* Header */}
      <header className="border-b glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              JobWhisperer AI
            </h1>
          </div>
          <Link to="/auth">
            <Button variant="outline" className="border-2 hover:border-primary hover:shadow-glow transition-all">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-sm font-medium text-white shadow-glow animate-fade-in">
            <Sparkles className="h-4 w-4" />
            Powered by Gemini AI
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-in">
            Land Your Dream Job with{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              AI-Powered Precision
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Autofill applications, match your resume to job descriptions, generate tailored answers, 
            and track every opportunity - all powered by advanced AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-scale-in">
            <Link to="/auth">
              <Button size="lg" className="gap-2 text-lg px-8 bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 border-2 hover:border-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need to Succeed
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-card">
              <CardContent className="pt-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-xl transition-all duration-300">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">Smart Autofill</h4>
                <p className="text-muted-foreground">
                  Let AI fill out job applications for you. Save hours on repetitive form filling.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 hover:border-secondary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-card">
              <CardContent className="pt-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-secondary flex items-center justify-center shadow-glow group-hover:shadow-xl transition-all duration-300">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold bg-gradient-secondary bg-clip-text text-transparent">Resume Scoring</h4>
                <p className="text-muted-foreground">
                  Get instant AI analysis of how well your resume matches job descriptions.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 hover:border-accent/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-card">
              <CardContent className="pt-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow group-hover:shadow-xl transition-all duration-300">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold bg-gradient-accent bg-clip-text text-transparent">Tailored Answers</h4>
                <p className="text-muted-foreground">
                  Generate personalized responses to common interview questions instantly.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-card">
              <CardContent className="pt-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-xl transition-all duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">Application Tracking</h4>
                <p className="text-muted-foreground">
                  Track all your applications in one place with visual status updates.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 hover:border-secondary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-card">
              <CardContent className="pt-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-secondary flex items-center justify-center shadow-glow group-hover:shadow-xl transition-all duration-300">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold bg-gradient-secondary bg-clip-text text-transparent">Smart Insights</h4>
                <p className="text-muted-foreground">
                  Get actionable feedback on missing keywords and skills to highlight.
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 hover:border-accent/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-card">
              <CardContent className="pt-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow group-hover:shadow-xl transition-all duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-xl font-semibold bg-gradient-accent bg-clip-text text-transparent">Secure & Private</h4>
                <p className="text-muted-foreground">
                  Your data is encrypted and stored securely. We never share your information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto bg-gradient-hero text-white border-0 shadow-glow transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-12 text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">
              Ready to Supercharge Your Job Search?
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of job seekers who are landing interviews faster with AI-powered tools.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 bg-white text-primary hover:bg-white/90 shadow-xl transform hover:scale-110 transition-all">
                Start Free Today
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t glass-effect">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 JobWhisperer AI. Powered by Gemini AI & Supabase.</p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Landing;