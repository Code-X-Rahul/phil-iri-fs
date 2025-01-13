"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/card";



interface ReadingPassageProps {
  title: string;
  content: string;
}

export function ReadingPassage({ title, content }: ReadingPassageProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#0052CC]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-blue max-w-none">
          {content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
