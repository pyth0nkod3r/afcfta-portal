import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  FileText,
  Upload,
} from "lucide-react";
import Header from "~/components/portal/Header";
import { useToast } from "~/hooks/use-toast";
import { portalApi } from "~/lib/portal-api";

export default function RegisterPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verify assessment completion
    const isComplete = sessionStorage.getItem("afcfta_assessment_complete") === "true";
    const score = parseInt(sessionStorage.getItem("afcfta_assessment_score") || "0");
    
    if (!isComplete || score < 70) {
      toast({
        title: "Assessment Required",
        description: "You must complete the readiness assessment with a passing score before registering.",
        variant: "destructive",
      });
      navigate("/assessment");
    }
  }, [navigate, toast]);

  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    country: "",
    industry: "",
    address: "",
    contactName: "",
    email: "",
    phone: "",
    tin: "",
    vat: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      // Final step - submit registration
      setIsSubmitting(true);
      
      try {
        await portalApi.register(formData);
        
        // Show 5-second toast notification
        toast({
          title: "Registration Successful!",
          description:
            "Your application has been received. You can now login to access your dashboard.",
          duration: 5000,
        });
        
        // Redirect to login after 5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 5000);
        
      } catch (error) {
        toast({
          title: "Registration Failed",
          description: error instanceof Error ? error.message : "An error occurred during registration",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link
                to="/results?score=100"
                className="text-primary hover:underline inline-flex items-center gap-2 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Results
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Business Registration
              </h1>
              <p className="text-muted-foreground">
                Step {step} of {totalSteps}
              </p>
            </div>

            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${
                      num <= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {num}
                  </div>
                  {num < totalSteps && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        num < step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <Card className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <Building2 className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-bold text-foreground">
                        Company Information
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="company-name">Company Name *</Label>
                        <Input
                          id="company-name"
                          required
                          placeholder="Enter your company name"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange("companyName", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="registration-number">
                          Business Registration Number *
                        </Label>
                        <Input
                          id="registration-number"
                          required
                          placeholder="Enter registration number"
                          value={formData.registrationNumber}
                          onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Select required value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ng">Nigeria</SelectItem>
                            <SelectItem value="za">South Africa</SelectItem>
                            <SelectItem value="ke">Kenya</SelectItem>
                            <SelectItem value="gh">Ghana</SelectItem>
                            <SelectItem value="et">Ethiopia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="industry">Industry Sector *</Label>
                        <Select required value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                          <SelectTrigger id="industry">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manufacturing">
                              Manufacturing
                            </SelectItem>
                            <SelectItem value="agriculture">
                              Agriculture
                            </SelectItem>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="textiles">Textiles</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="address">Business Address *</Label>
                        <Textarea
                          id="address"
                          required
                          placeholder="Enter complete business address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <FileText className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-bold text-foreground">
                        Contact & Tax Information
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="contact-name">
                          Contact Person Name *
                        </Label>
                        <Input
                          id="contact-name"
                          required
                          placeholder="Full name"
                          value={formData.contactName}
                          onChange={(e) => handleInputChange("contactName", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Business Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="contact@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          placeholder="+234 xxx xxx xxxx"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="tin">
                          Tax Identification Number (TIN) *
                        </Label>
                        <Input id="tin" required placeholder="Enter TIN" value={formData.tin} onChange={(e) => handleInputChange("tin", e.target.value)} />
                      </div>

                      <div>
                        <Label htmlFor="vat">VAT Registration Number</Label>
                        <Input
                          id="vat"
                          placeholder="Enter VAT number (if applicable)"
                          value={formData.vat}
                          onChange={(e) => handleInputChange("vat", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="password">Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          required
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <Upload className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-bold text-foreground">
                        Document Upload
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label>Business Registration Certificate *</Label>
                        <div className="mt-2 flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Click to upload or drag and drop
                            </p>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.png"
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <Label>Certificate of Origin *</Label>
                        <div className="mt-2 flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Click to upload or drag and drop
                            </p>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.png"
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <Label>Import/Export License *</Label>
                        <div className="mt-2 flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Click to upload or drag and drop
                            </p>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.png"
                            />
                          </label>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Accepted formats: PDF, JPG, PNG (Max 5MB per file)
                      </p>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between pt-6">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep((prev) => prev - 1)}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  )}

                  <Button type="submit" className={step === 1 ? "ml-auto" : ""} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    ) : (
                      <>
                        {step === totalSteps ? "Submit Registration" : "Continue"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                Need help? Contact our support team at support@afcfta-portal.org
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
