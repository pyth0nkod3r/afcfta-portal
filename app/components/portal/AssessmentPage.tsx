import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import Header from "~/components/portal/Header";

const questions = [
  { id: 1, question: "Does your business have a valid business registration certificate?", options: ["Yes", "No", "In Progress"] },
  { id: 2, question: "Do you have a Tax Identification Number (TIN)?", options: ["Yes", "No", "In Progress"] },
  { id: 3, question: "Is your business registered for VAT?", options: ["Yes", "No", "Not Applicable"] },
  { id: 4, question: "Do you have an import/export license?", options: ["Yes", "No", "In Progress"] },
  { id: 5, question: "Are your products/services compliant with AfCFTA standards?", options: ["Yes", "No", "Under Review"] },
  { id: 6, question: "Do you have a certificate of origin for your products?", options: ["Yes", "No", "In Progress"] },
  { id: 7, question: "Have you completed customs registration?", options: ["Yes", "No", "In Progress"] },
  { id: 8, question: "Do you have international payment processing capabilities?", options: ["Yes", "No", "Setting Up"] },
  { id: 9, question: "Are your business documents translated into official AU languages (if required)?", options: ["Yes", "No", "Not Required"] },
  { id: 10, question: "Do you have liability insurance for cross-border trade?", options: ["Yes", "No", "In Progress"] },
  { id: 11, question: "Have you identified target markets within AfCFTA member states?", options: ["Yes", "No", "Researching"] },
  { id: 12, question: "Do you have a logistics partner for cross-border shipments?", options: ["Yes", "No", "In Negotiation"] },
];

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = answers[questions[currentQuestion].id] !== undefined;

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: answer }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const yesCount = Object.values(answers).filter((a) => a === "Yes").length;
      const score = Math.round((yesCount / questions.length) * 100);
      
      // Store assessment result in session storage
      sessionStorage.setItem("afcfta_assessment_complete", "true");
      sessionStorage.setItem("afcfta_assessment_score", score.toString());
      
      navigate(`/results?score=${score}`);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link to="/portal" className="text-primary hover:underline inline-flex items-center gap-2 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">AfCFTA Readiness Assessment</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <div className="mb-8"><Progress value={progress} className="h-2" /></div>
            <Card className="p-8 md:p-12">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{currentQ.id}</div>
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">{currentQ.question}</h2>
                  </div>
                </div>
                <RadioGroup value={answers[currentQ.id]} onValueChange={handleAnswer} className="space-y-4">
                  {currentQ.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer" onClick={() => handleAnswer(option)}>
                      <RadioGroupItem value={option} id={`option-${idx}`} />
                      <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer text-base">{option}</Label>
                      {answers[currentQ.id] === option && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </div>
                  ))}
                </RadioGroup>
                <div className="flex items-center justify-between pt-6">
                  <Button variant="outline" onClick={handleBack} disabled={currentQuestion === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button onClick={handleNext} disabled={!canProceed}>
                    {isLastQuestion ? "View Results" : "Next Question"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
            <div className="mt-6 text-center text-sm text-muted-foreground"><p>Your responses are saved automatically as you progress</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
