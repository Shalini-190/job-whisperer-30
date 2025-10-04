import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink, Edit, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Application {
  id: string;
  company_name: string;
  position_title: string;
  job_description: string | null;
  application_url: string | null;
  status: string;
  applied_date: string | null;
  notes: string | null;
}

const statusColors: Record<string, string> = {
  not_submitted: "bg-secondary text-secondary-foreground",
  submitted: "bg-primary/20 text-primary",
  received_response: "bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300",
  interview_requested: "bg-success/20 text-success",
  rejected: "bg-destructive/20 text-destructive",
  offer: "bg-success text-success-foreground",
};

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [formData, setFormData] = useState({
    company_name: "",
    position_title: "",
    job_description: "",
    application_url: "",
    status: "not_submitted",
    applied_date: "",
    notes: "",
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching applications:", error);
      toast.error("Error loading applications");
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (editingApp) {
      const { error } = await supabase
        .from("job_applications")
        .update(formData)
        .eq("id", editingApp.id);

      if (error) {
        toast.error("Error updating application");
      } else {
        toast.success("Application updated!");
        setDialogOpen(false);
        fetchApplications();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from("job_applications")
        .insert([{ ...formData, user_id: user.id }]);

      if (error) {
        toast.error("Error creating application");
      } else {
        toast.success("Application added!");
        setDialogOpen(false);
        fetchApplications();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("job_applications")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error deleting application");
    } else {
      toast.success("Application deleted");
      fetchApplications();
    }
  };

  const resetForm = () => {
    setFormData({
      company_name: "",
      position_title: "",
      job_description: "",
      application_url: "",
      status: "not_submitted",
      applied_date: "",
      notes: "",
    });
    setEditingApp(null);
  };

  const openEditDialog = (app: Application) => {
    setEditingApp(app);
    setFormData({
      company_name: app.company_name,
      position_title: app.position_title,
      job_description: app.job_description || "",
      application_url: app.application_url || "",
      status: app.status,
      applied_date: app.applied_date || "",
      notes: app.notes || "",
    });
    setDialogOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
          <p className="text-muted-foreground mt-2">Track all your job applications</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Application
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingApp ? "Edit" : "Add"} Application</DialogTitle>
              <DialogDescription>
                {editingApp ? "Update" : "Add"} your job application details
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position_title">Position</Label>
                  <Input
                    id="position_title"
                    value={formData.position_title}
                    onChange={(e) => setFormData({ ...formData, position_title: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_description">Job Description</Label>
                <Textarea
                  id="job_description"
                  value={formData.job_description}
                  onChange={(e) => setFormData({ ...formData, job_description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="application_url">Application URL</Label>
                  <Input
                    id="application_url"
                    type="url"
                    value={formData.application_url}
                    onChange={(e) => setFormData({ ...formData, application_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applied_date">Applied Date</Label>
                  <Input
                    id="applied_date"
                    type="date"
                    value={formData.applied_date}
                    onChange={(e) => setFormData({ ...formData, applied_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not_submitted">Not Submitted</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="received_response">Received Response</SelectItem>
                    <SelectItem value="interview_requested">Interview Requested</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                {editingApp ? "Update" : "Add"} Application
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No applications yet. Add your first one to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{app.position_title}</CardTitle>
                    <CardDescription className="text-base">{app.company_name}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[app.status]}>
                      {app.status.replace("_", " ")}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(app)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(app.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {app.job_description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{app.job_description}</p>
                )}
                {app.application_url && (
                  <a
                    href={app.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View Posting <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {app.applied_date && (
                  <p className="text-sm text-muted-foreground">
                    Applied: {new Date(app.applied_date).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;