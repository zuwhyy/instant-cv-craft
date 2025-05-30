import React, { useState, useEffect } from "react";
import { CVData, CVTemplate } from "@/types/cv";
import { CVForm } from "./CVForm";
import { CVPreview } from "./CVPreview";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Sun, Download, Eye, FileText, Bot, ArrowLeft } from "lucide-react";
import html2pdf from "html2pdf.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { generateCVData } from "@/server/GeminiAPI";
import { Loader2 } from "lucide-react";

const initialCVData: CVData = {
  personalInfo: {
    fullName: "",
    address: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
  },
  profileSummary: "",
  education: [],
  workExperience: [],
  hardSkills: [],
  softSkills: [],
  certifications: [],
  projects: [],
  organizations: [],
  languages: [],
  references: [],
};

export const CVBuilder: React.FC = () => {
  const [cvData, setCVData] = useState<CVData>(initialCVData);
  const [template, setTemplate] = useState<CVTemplate>("minimal");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("cvData");
    if (saved) {
      setCVData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cvData", JSON.stringify(cvData));
  }, [cvData]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const downloadPDF = () => {
    const element = document.getElementById("cv-preview");
    if (element) {
      const opt = {
        margin: 0,
        filename: `${cvData.personalInfo.fullName || "CV"} CV.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  const MobileHeader = () => (
    <div className="lg:hidden bg-white dark:bg-gray-900 border-b p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">CV Builder</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button onClick={downloadPDF} size="sm">
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant={activeTab === "form" ? "default" : "outline"} onClick={() => setActiveTab("form")} className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          Form
        </Button>
        <Button variant={activeTab === "preview" ? "default" : "outline"} onClick={() => setActiveTab("preview")} className="flex-1">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </div>
    </div>
  );

  const DesktopHeader = () => (
    <div className="hidden lg:flex bg-white dark:bg-gray-900 border-b p-4 items-center justify-between sticky top-0 z-50">
      <a href="/">
        <ArrowLeft size={30} />
      </a>
      <div className="flex items-center gap-4">
        <CVBuilderWithAI />
        <Select value={template} onValueChange={(value: CVTemplate) => setTemplate(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="minimal">Minimal Professional</SelectItem>
            <SelectItem value="modern">Modern Highlight</SelectItem>
            <SelectItem value="classic">Classic Academic</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button onClick={downloadPDF}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>
    </div>
  );

  const CVBuilderWithAI = () => {
    const [step, setStep] = useState(1);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      position: "",
      background: "",
    });

    const handleSubmit = async () => {
      if (step < 3) {
        setStep(step + 1);
      } else {
        try {
          setIsLoading(true);
          const generatedCVData = await generateCVData(formData);
          setCVData(generatedCVData);
          setOpen(false);
          // Reset form
          setStep(1);
          setFormData({
            fullName: "",
            email: "",
            position: "",
            background: "",
          });
        } catch (error) {
          console.error("Error generating CV:", error);
          // You might want to show an error message to the user here
        } finally {
          setIsLoading(false);
        }
      }
    };

    const renderStep = () => {
      switch (step) {
        case 1:
          return (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Nama Lengkap *</label>
                <Input placeholder="Masukkan nama lengkap Anda" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Email Aktif *</label>
                <Input placeholder="Masukkan email aktif Anda" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
            </div>
          );
        case 2:
          return (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Posisi yang Dilamar</label>
                <Input placeholder="Contoh: UI/UX Designer, Digital Marketer" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} />
              </div>
            </div>
          );
        case 3:
          return (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Ceritakan Tentang Diri Anda</label>
                <textarea
                  className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Ceritakan tentang latar belakang pendidikan, pengalaman kerja/magang, keahlian utama, dan hal penting lainnya..."
                  value={formData.background}
                  onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                />
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Bot className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>CV Builder dengan AI - Langkah {step} dari 3</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {renderStep()}
            <div className="flex justify-between">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} disabled={isLoading}>
                  Kembali
                </Button>
              )}
              <Button onClick={handleSubmit} className={step > 1 ? "" : "ml-auto"} disabled={(step === 1 && (!formData.fullName || !formData.email)) || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : step === 3 ? (
                  "Selesai"
                ) : (
                  "Lanjutkan"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <MobileHeader />
      <DesktopHeader />

      <div className="lg:flex lg:h-[calc(100vh-73px)]">
        {/* Form Section */}
        <div className={`lg:w-2/5 lg:border-r ${isMobile && activeTab !== "form" ? "hidden" : ""}`}>
          <CVForm cvData={cvData} setCVData={setCVData} />
        </div>

        {/* Preview Section */}
        <div className={`lg:w-3/5 ${isMobile && activeTab !== "preview" ? "hidden" : ""}`}>
          <CVPreview cvData={cvData} setCVData={setCVData} template={template} />
        </div>
      </div>
    </div>
  );
};
