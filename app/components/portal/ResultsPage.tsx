import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react";
import Header from "~/components/portal/Header";

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const [score, setScore] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const scoreParam = searchParams.get("score");
    if (scoreParam) {
      setScore(parseInt(scoreParam));
    }
    
    // Verify if assessment was actually completed
    const isComplete = sessionStorage.getItem("afcfta_assessment_complete") === "true";
    const storedScore = sessionStorage.getItem("afcfta_assessment_score");
    
    // Check if stored score matches URL score (optional security enhancement)
    // For now, just checking if assessment was completed
    setIsVerified(isComplete);
  }, [searchParams]);

  const isPassed = score >= 70;
  const isClose = score >= 60 && score < 70;

  const getStatusIcon = () => {
    if (isPassed) return <CheckCircle2 className="w-16 h-16 text-success" />;
    if (isClose)
      return <AlertCircle className="w-16 h-16 text-accent-foreground" />;
    return <XCircle className="w-16 h-16 text-destructive" />;
  };

  const getStatusMessage = () => {
    if (isPassed) {
      return {
        title: "Congratulations! You're Ready",
        description:
          "Your business meets the requirements to participate in AfCFTA trade. You can proceed with registration to access your dashboard.",
      };
    }
    if (isClose) {
      return {
        title: "Almost There!",
        description:
          "You're very close to meeting the requirements. Review the areas below and complete the missing items to achieve at least 70%.",
      };
    }
    return {
      title: "Additional Requirements Needed",
      description:
        "Your business needs to complete several requirements before participating in AfCFTA trade. We'll guide you through each step.",
    };
  };

  const status = getStatusMessage();

  const requirements = [
    {
      name: "Business Registration",
      status: score >= 8.33 ? "complete" : "incomplete",
    },
    {
      name: "Tax Identification",
      status: score >= 16.66 ? "complete" : "incomplete",
    },
    {
      name: "VAT Registration",
      status: score >= 25 ? "complete" : "incomplete",
    },
    {
      name: "Import/Export License",
      status: score >= 33.33 ? "complete" : "incomplete",
    },
    {
      name: "AfCFTA Compliance",
      status: score >= 41.66 ? "complete" : "incomplete",
    },
    {
      name: "Certificate of Origin",
      status: score >= 50 ? "complete" : "incomplete",
    },
    {
      name: "Customs Registration",
      status: score >= 58.33 ? "complete" : "incomplete",
    },
    {
      name: "Payment Processing",
      status: score >= 66.66 ? "complete" : "incomplete",
    },
    {
      name: "Document Translation",
      status: score >= 75 ? "complete" : "incomplete",
    },
    {
      name: "Liability Insurance",
      status: score >= 83.33 ? "complete" : "incomplete",
    },
    {
      name: "Market Research",
      status: score >= 91.66 ? "complete" : "incomplete",
    },
    {
      name: "Logistics Partnership",
      status: score === 100 ? "complete" : "incomplete",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-6">
                {getStatusIcon()}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Your Readiness Score
              </h1>

              <div className="inline-flex items-center justify-center w-48 h-48 rounded-full bg-primary/10 border-8 border-primary mb-6">
                <span className="text-6xl font-bold text-primary">
                  {score}%
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {status.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {status.description}
              </p>
            </div>

            <Card className="p-8 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Requirements Checklist
              </h3>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <span className="font-medium text-foreground">
                      {req.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {req.status === "complete" ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-success" />
                          <span className="text-sm font-medium text-success">
                            Complete
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-destructive" />
                          <span className="text-sm font-medium text-destructive">
                            Required
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isPassed && isVerified ? (
                <>
                  <Button size="lg" asChild>
                    <Link to="/register">
                      Proceed to Registration
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/login">Already Registered? Login</Link>
                  </Button>
                </>
              ) : (
                <Button size="lg" variant={isPassed ? "default" : "outline"} asChild>
                  <Link to="/assessment">
                    {isPassed ? "Verify Readiness to Register" : "Retake Assessment"}
                  </Link>
                </Button>
              )}

              <Button size="lg" variant="outline" asChild>
                <Link to="/portal">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
