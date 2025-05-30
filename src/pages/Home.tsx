import React, { useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { FileText, Sparkles, Download, Eye, Edit3, Facebook, FilePenLine } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const controls = useAnimation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      color: "from-gray-100 to-gray-200",
      accent: "bg-black",
      icon: <FileText size={20} />,
    },
    {
      id: 2,
      name: "Creative Designer",
      color: "from-gray-50 to-white",
      accent: "bg-gray-800",
      icon: <Sparkles size={20} />,
    },
    {
      id: 3,
      name: "Executive Classic",
      color: "from-white to-gray-100",
      accent: "bg-gray-900",
      icon: <Edit3 size={20} />,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTemplate((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-200 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="">
            <motion.div className="mb-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <h1 className="text-6xl  font-bold text-black leading-[1.2]">
                Bikin CV dulu,
                <motion.span
                  className="block text-gray-600"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    background: "linear-gradient(90deg, #000 0%, #666 50%, #000 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  siapa tahu 19 juta lapangan kerja beneran datang!
                </motion.span>
              </h1>
            </motion.div>

            <motion.div className=" flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
              <motion.button
                className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 shadow-lg"
                whileHover={{
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                onClick={() => {
                  window.location.href = "/cv-builder";
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FilePenLine size={20} />
                Start Building
              </motion.button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <motion.button
                    className="border-2 border-black text-black px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3"
                    whileHover={{
                      backgroundColor: "#000",
                      color: "#fff",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Facebook size={20} />
                    Scroll Facebook
                  </motion.button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <div className="">
                    <img src="https://img.ifunny.co/images/68c38e7f4275955dedf72129cdaebf32a084301154b21b2956e70583bd7ed374_1.jpg" alt="" />
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>

          {/* Right Side - Floating CV Templates */}
          <motion.div className="relative h-[600px] flex items-center justify-center" onMouseMove={handleMouseMove} style={{ perspective: 1000 }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
            {/* Central rotating container */}
            <motion.div
              className="relative w-96 h-96"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                rotateX,
                rotateY,
              }}
            >
              {templates.map((template, index) => {
                const angle = index * 120 * (Math.PI / 180); // 120 degrees apart
                const radius = 140;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={template.id}
                    className="absolute top-1/2 left-1/2 origin-center cursor-pointer"
                    style={{
                      x: x - 60, // Center the card (120px width / 2)
                      y: y - 80, // Center the card (160px height / 2)
                    }}
                    animate={{
                      rotate: -360, // Counter-rotate to keep cards upright
                      scale: activeTemplate === index ? 1.1 : 1,
                      zIndex: activeTemplate === index ? 10 : 1,
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 0.3 },
                      zIndex: { duration: 0 },
                    }}
                    whileHover={{
                      scale: 1.2,
                      zIndex: 20,
                      rotateZ: 5,
                    }}
                    onClick={() => setActiveTemplate(index)}
                  >
                    {/* CV Card */}
                    <motion.div
                      className={` w-60 h-64 bg-gradient-to-br ${template.color} rounded-lg shadow-2xl border border-gray-200 relative overflow-hidden`}
                      whileHover={{
                        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                      }}
                    >
                      {/* Card Header */}
                      <div className={`${template.accent} h-8 w-full relative`}>
                        <motion.div className="absolute inset-0 bg-white" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} style={{ transformOrigin: "left" }} />
                        <div className="relative z-10 flex items-center justify-center h-full text-white">{template.icon}</div>
                      </div>

                      {/* Card Content Lines */}
                      <div className="p-3 space-y-2">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="bg-gray-400 rounded"
                            style={{
                              height: i === 0 ? "6px" : "3px",
                              width: i === 0 ? "80%" : `${60 + Math.random() * 30}%`,
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              delay: index * 0.2 + i * 0.1,
                              duration: 0.3,
                            }}
                          />
                        ))}
                      </div>

                      {/* Hover overlay */}
                      <motion.div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center" whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} whileHover={{ opacity: 1, scale: 1 }} className="text-xs font-semibold text-black bg-white px-2 py-1 rounded">
                          {template.name}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Central glow effect */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)",
              }}
              animate={{
                scale: isHovered ? 1.5 : 1,
                opacity: isHovered ? 0.3 : 0.1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Floating action button */}
      <motion.div className="fixed bottom-8 right-8 z-20" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 0.5 }}>
        <motion.button
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl"
          whileHover={{
            scale: 1.1,
            rotate: 360,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Sparkles size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;
