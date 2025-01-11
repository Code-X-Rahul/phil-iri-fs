import Image from "next/image";

import {
  Timer,
  Mic,
  GraduationCap,
  BrainCircuit,
  ClipboardCheck,
  BarChart,
  Users,
} from "lucide-react";
import { Card } from "@/common/components/card";
import { Button } from "@/common/components/button";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0052CC] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Revolutionizing Reading Assessment in the Philippines
            </h1>
            <p className="text-lg md:text-xl text-blue-100">
              Phil-IRI is an innovative AI-powered reading assessment system
              designed to evaluate and enhance students&apos; reading
              capabilities through advanced speech recognition technology.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#0052CC]">
            How Phil-IRI Works
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Mic className="h-6 w-6 text-[#0052CC]" />
              </div>
              <h3 className="text-xl font-semibold">Speech-to-Text Analysis</h3>
              <p className="text-gray-600">
                Advanced speech recognition technology accurately captures and
                analyzes student reading patterns, pronunciation, and fluency in
                real-time.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <BrainCircuit className="h-6 w-6 text-[#0052CC]" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Assessment</h3>
              <p className="text-gray-600">
                Our AI system evaluates reading performance by identifying
                mispronunciations and analyzing reading patterns for
                comprehensive assessment.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Timer className="h-6 w-6 text-[#0052CC]" />
              </div>
              <h3 className="text-xl font-semibold">Timed Evaluations</h3>
              <p className="text-gray-600">
                Students complete reading assessments and comprehension
                questions within a 30-minute timeframe, ensuring efficient and
                focused evaluation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Process */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#0052CC]">
            Assessment Process
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Material Selection
                  </h3>
                  <p className="text-gray-600">
                    Students are presented with grade-appropriate reading
                    materials carefully selected for assessment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Reading Assessment
                  </h3>
                  <p className="text-gray-600">
                    Using speech-to-text technology, students read the material
                    aloud while the system analyzes their performance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Comprehension Test
                  </h3>
                  <p className="text-gray-600">
                    Students answer comprehension questions to demonstrate
                    understanding of the material.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Results Analysis
                  </h3>
                  <p className="text-gray-600">
                    The system generates detailed reports based on pronunciation
                    accuracy and comprehension scores.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/reading-book2.png"
                alt="Assessment Process Illustration"
                fill
                className="object-fill"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#0052CC]">
            Benefits of Phil-IRI
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-[#0052CC]" />
              </div>
              <h3 className="font-semibold">Accurate Assessment</h3>
              <p className="text-gray-600">
                Precise evaluation of reading skills and comprehension levels
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <ClipboardCheck className="h-6 w-6 text-[#0052CC]" />
              </div>
              <h3 className="font-semibold">Efficient Testing</h3>
              <p className="text-gray-600">
                Streamlined 30-minute assessment process
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-[#0052CC]" />
              </div>
              <h3 className="font-semibold">Detailed Analytics</h3>
              <p className="text-gray-600">
                Comprehensive reports on reading performance
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-[#0052CC]" />
              </div>
              <h3 className="font-semibold">Student Growth</h3>
              <p className="text-gray-600">
                Targeted feedback for improved reading skills
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0052CC] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Transform Reading Assessment?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join schools across the Philippines in revolutionizing how we
            evaluate and improve student reading capabilities.
          </p>
          <Button className="bg-black hover:bg-gray-700 text-white">
            Get Started Today
          </Button>
        </div>
      </section>
    </>
  );
}
