import Image from "next/image";

import {
  Play,
  DropletIcon,
  BugIcon as Bacteria,
  Salad,
  WormIcon as Virus,
} from "lucide-react";
import { Button } from "../../common/components/button";
import { Card } from "../../common/components/card";

export default function Home() {
  return (
    <>
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1 relative h-[300px] sm:h-[400px] lg:h-[500px]">
            <Image
              src="/reading-book.png"
              alt="Skin Health"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="order-1 lg:order-2 space-y-4 md:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0052CC] leading-tight">
              A Reading Assessment Revolution in the Philippines
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              AI Revolution, Reading Diagnosis, 98% Accuracy, Cost Effective
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-black hover:bg-gray-700 text-white w-full sm:w-auto">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-[#0052CC] text-[#0052CC] hover:bg-blue-50 w-full sm:w-auto"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-blue-50/50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-xl md:text-2xl text-[#0052CC] font-medium mb-8 md:mb-12">
            READING IS THE WINDOW TO KNOWLEDGE
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl text-[#0052CC] font-semibold mb-4 md:mb-6">
                Reading reflects learning capacity
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4 md:p-6 bg-[#0052CC] text-white">
                  <Salad className="w-6 h-6 mb-2" />
                  <h4 className="font-medium">Comprehension</h4>
                </Card>
                <Card className="p-4 md:p-6 bg-[#0052CC] text-white">
                  <Bacteria className="w-6 h-6 mb-2" />
                  <h4 className="font-medium">Vocabulary</h4>
                </Card>
                <Card className="p-4 md:p-6 bg-[#0052CC] text-white">
                  <DropletIcon className="w-6 h-6 mb-2" />
                  <h4 className="font-medium">Fluency</h4>
                </Card>
                <Card className="p-4 md:p-6 bg-[#0052CC] text-white">
                  <Virus className="w-6 h-6 mb-2" />
                  <h4 className="font-medium">Analysis</h4>
                </Card>
              </div>
            </div>

            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/reading-book3.png"
                alt="Reading Assessment"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-8 md:mt-16">
            <h3 className="text-lg md:text-xl text-[#0052CC] font-semibold mb-4 md:mb-6">
              Reading assessment reveals:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Reading Level",
                "Learning Style",
                "Comprehension Skills",
                "Areas for Improvement",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5 text-[#FF0000] flex-shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
