import { CVData } from "@/types/cv";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generateCVData = async (userData: { fullName: string; email: string; position: string; background: string }): Promise<CVData> => {
  const prompt = `Saya akan memberikan data singkat dari pengguna berupa:
1. Nama dan email: ${userData.fullName} (${userData.email})
2. Posisi atau pekerjaan yang ingin dilamar: ${userData.position}
3. Deskripsi singkat tentang pengalaman, latar belakang pendidikan, dan keahlian: ${userData.background}

Silakan bantu buatkan data lengkap dalam format JSON sesuai struktur berikut:

\`\`\`ts
export interface CVData {
  personalInfo: PersonalInfo;
  profileSummary: string;
  education: Education[];
  workExperience: WorkExperience[];
  hardSkills: string[];
  softSkills: string[];
  certifications: Certification[];
  projects: Project[];
  organizations: Organization[];
  languages: Language[];
  references: Reference[];
}
\`\`\`

Mohon berikan response dalam format JSON yang valid dan lengkap tanpa komentar atau teks tambahan lainnya.`;

  try {
    // Gunakan model yang masih didukung
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // atau "gemini-1.5-pro"
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    // Bersihkan response dari markdown formatting
   const cleanedText = generatedText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Extract JSON dari response
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    try {
      const cvData: CVData = JSON.parse(jsonMatch[0]);
      return cvData;
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      console.error("Generated text:", generatedText);
      throw new Error("Failed to parse generated JSON");
    }
  } catch (error) {
    console.error("Error generating CV data:", error);
    throw error;
  }
};
