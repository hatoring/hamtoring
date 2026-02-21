import GradientBg from "@/components/GradientBg";
import ProfileCard from "@/components/ProfileCard";
import InfoGrid from "@/components/InfoGrid";
import ContactBar from "@/components/ContactBar";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-primary/30">
      <GradientBg />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-10">
        <ProfileCard />
        <InfoGrid />
        <ContactBar />
      </div>
    </main>
  );
}
