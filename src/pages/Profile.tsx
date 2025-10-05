import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash2, Briefcase, GraduationCap, Award, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WorkExperience {
  id?: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
}

interface Education {
  id?: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
}

interface Skill {
  id?: string;
  skill_name: string;
  proficiency: string;
}

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
    summary: "",
  });

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetchProfile();
    fetchWorkExperiences();
    fetchEducation();
    fetchSkills();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else if (data) {
      setProfile({
        full_name: data.full_name || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        linkedin_url: data.linkedin_url || "",
        github_url: data.github_url || "",
        portfolio_url: data.portfolio_url || "",
        summary: data.summary || "",
      });
    }
  };

  const fetchWorkExperiences = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("work_experiences")
      .select("*")
      .eq("user_id", user.id)
      .order("start_date", { ascending: false });

    if (!error && data) {
      setWorkExperiences(data);
    }
  };

  const fetchEducation = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("education")
      .select("*")
      .eq("user_id", user.id)
      .order("start_date", { ascending: false });

    if (!error && data) {
      setEducation(data);
    }
  };

  const fetchSkills = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("user_id", user.id)
      .order("skill_name");

    if (!error && data) {
      setSkills(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update(profile)
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      toast.error("Error updating profile");
      console.error(error);
    } else {
      toast.success("Profile updated successfully!");
    }
  };

  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: null,
        is_current: false,
        description: "",
      },
    ]);
  };

  const removeWorkExperience = async (index: number) => {
    const experience = workExperiences[index];
    if (experience.id) {
      const { error } = await supabase
        .from("work_experiences")
        .delete()
        .eq("id", experience.id);

      if (error) {
        toast.error("Error deleting work experience");
        return;
      }
    }

    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
    toast.success("Work experience removed");
  };

  const saveWorkExperience = async (index: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const experience = workExperiences[index];
    
    if (experience.id) {
      const { error } = await supabase
        .from("work_experiences")
        .update(experience)
        .eq("id", experience.id);

      if (error) {
        toast.error("Error updating work experience");
      } else {
        toast.success("Work experience updated");
      }
    } else {
      const { data, error } = await supabase
        .from("work_experiences")
        .insert({ ...experience, user_id: user.id })
        .select()
        .single();

      if (error) {
        toast.error("Error adding work experience");
      } else {
        const updated = [...workExperiences];
        updated[index] = data;
        setWorkExperiences(updated);
        toast.success("Work experience added");
      }
    }
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        institution: "",
        degree: "",
        field_of_study: "",
        start_date: "",
        end_date: null,
      },
    ]);
  };

  const removeEducation = async (index: number) => {
    const edu = education[index];
    if (edu.id) {
      const { error } = await supabase
        .from("education")
        .delete()
        .eq("id", edu.id);

      if (error) {
        toast.error("Error deleting education");
        return;
      }
    }

    setEducation(education.filter((_, i) => i !== index));
    toast.success("Education removed");
  };

  const saveEducation = async (index: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const edu = education[index];
    
    if (edu.id) {
      const { error } = await supabase
        .from("education")
        .update(edu)
        .eq("id", edu.id);

      if (error) {
        toast.error("Error updating education");
      } else {
        toast.success("Education updated");
      }
    } else {
      const { data, error } = await supabase
        .from("education")
        .insert({ ...edu, user_id: user.id })
        .select()
        .single();

      if (error) {
        toast.error("Error adding education");
      } else {
        const updated = [...education];
        updated[index] = data;
        setEducation(updated);
        toast.success("Education added");
      }
    }
  };

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        skill_name: "",
        proficiency: "intermediate",
      },
    ]);
  };

  const removeSkill = async (index: number) => {
    const skill = skills[index];
    if (skill.id) {
      const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", skill.id);

      if (error) {
        toast.error("Error deleting skill");
        return;
      }
    }

    setSkills(skills.filter((_, i) => i !== index));
    toast.success("Skill removed");
  };

  const saveSkill = async (index: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const skill = skills[index];
    
    if (skill.id) {
      const { error } = await supabase
        .from("skills")
        .update(skill)
        .eq("id", skill.id);

      if (error) {
        toast.error("Error updating skill");
      } else {
        toast.success("Skill updated");
      }
    } else {
      const { data, error } = await supabase
        .from("skills")
        .insert({ ...skill, user_id: user.id })
        .select()
        .single();

      if (error) {
        toast.error("Error adding skill");
      } else {
        const updated = [...skills];
        updated[index] = data;
        setSkills(updated);
        toast.success("Skill added");
      }
    }
  };

  return (
    <div className="max-w-5xl space-y-8 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Your Profile</h2>
          <p className="text-muted-foreground mt-1">
            Complete your profile to help AI generate better application materials
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <Card className="border-2 hover:shadow-xl transition-all duration-300 bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Personal Information
          </CardTitle>
          <CardDescription>Your basic contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  placeholder="John Doe"
                  className="transition-all focus:shadow-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="john@example.com"
                  className="transition-all focus:shadow-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="transition-all focus:shadow-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="San Francisco, CA"
                  className="transition-all focus:shadow-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={profile.summary}
                onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                placeholder="Brief overview of your professional background and career goals..."
                rows={4}
                className="transition-all focus:shadow-md"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="h-1 w-8 bg-gradient-primary rounded-full"></span>
                Links
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    value={profile.linkedin_url}
                    onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/johndoe"
                    className="transition-all focus:shadow-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub</Label>
                  <Input
                    id="github_url"
                    type="url"
                    value={profile.github_url}
                    onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                    placeholder="https://github.com/johndoe"
                    className="transition-all focus:shadow-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio_url">Portfolio</Label>
                  <Input
                    id="portfolio_url"
                    type="url"
                    value={profile.portfolio_url}
                    onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })}
                    placeholder="https://johndoe.com"
                    className="transition-all focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="shadow-lg hover:shadow-xl transition-all">
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card className="border-2 hover:shadow-xl transition-all duration-300 bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Work Experience
              </CardTitle>
              <CardDescription>Add your professional work history</CardDescription>
            </div>
            <Button onClick={addWorkExperience} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {workExperiences.map((exp, index) => (
            <div key={index} className="p-4 border-2 rounded-lg space-y-4 hover:border-primary/50 transition-colors bg-background/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...workExperiences];
                      updated[index].company = e.target.value;
                      setWorkExperiences(updated);
                    }}
                    placeholder="Company Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => {
                      const updated = [...workExperiences];
                      updated[index].position = e.target.value;
                      setWorkExperiences(updated);
                    }}
                    placeholder="Job Title"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={exp.start_date}
                    onChange={(e) => {
                      const updated = [...workExperiences];
                      updated[index].start_date = e.target.value;
                      setWorkExperiences(updated);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={exp.end_date || ""}
                    onChange={(e) => {
                      const updated = [...workExperiences];
                      updated[index].end_date = e.target.value || null;
                      setWorkExperiences(updated);
                    }}
                    disabled={exp.is_current}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => {
                    const updated = [...workExperiences];
                    updated[index].description = e.target.value;
                    setWorkExperiences(updated);
                  }}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.is_current}
                  onChange={(e) => {
                    const updated = [...workExperiences];
                    updated[index].is_current = e.target.checked;
                    if (e.target.checked) {
                      updated[index].end_date = null;
                    }
                    setWorkExperiences(updated);
                  }}
                  className="h-4 w-4"
                />
                <Label>Currently working here</Label>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => saveWorkExperience(index)} size="sm">
                  Save
                </Button>
                <Button onClick={() => removeWorkExperience(index)} size="sm" variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="border-2 hover:shadow-xl transition-all duration-300 bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </CardTitle>
              <CardDescription>Add your educational background</CardDescription>
            </div>
            <Button onClick={addEducation} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="p-4 border-2 rounded-lg space-y-4 hover:border-primary/50 transition-colors bg-background/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[index].institution = e.target.value;
                      setEducation(updated);
                    }}
                    placeholder="University Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[index].degree = e.target.value;
                      setEducation(updated);
                    }}
                    placeholder="Bachelor's, Master's, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field_of_study}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[index].field_of_study = e.target.value;
                      setEducation(updated);
                    }}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={edu.start_date}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[index].start_date = e.target.value;
                      setEducation(updated);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date (or Expected)</Label>
                  <Input
                    type="date"
                    value={edu.end_date || ""}
                    onChange={(e) => {
                      const updated = [...education];
                      updated[index].end_date = e.target.value || null;
                      setEducation(updated);
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => saveEducation(index)} size="sm">
                  Save
                </Button>
                <Button onClick={() => removeEducation(index)} size="sm" variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="border-2 hover:shadow-xl transition-all duration-300 bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Skills
              </CardTitle>
              <CardDescription>Add your technical and soft skills</CardDescription>
            </div>
            <Button onClick={addSkill} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="p-4 border-2 rounded-lg space-y-3 hover:border-primary/50 transition-colors bg-background/50">
                <div className="space-y-2">
                  <Label>Skill Name</Label>
                  <Input
                    value={skill.skill_name}
                    onChange={(e) => {
                      const updated = [...skills];
                      updated[index].skill_name = e.target.value;
                      setSkills(updated);
                    }}
                    placeholder="JavaScript, Leadership, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Proficiency</Label>
                  <Select
                    value={skill.proficiency}
                    onValueChange={(value) => {
                      const updated = [...skills];
                      updated[index].proficiency = value;
                      setSkills(updated);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => saveSkill(index)} size="sm" className="flex-1">
                    Save
                  </Button>
                  <Button onClick={() => removeSkill(index)} size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;