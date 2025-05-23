"use client";

export default function ContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col px-20 md:px-32 lg:px-48">
      {children}
    </div>
  );
}
