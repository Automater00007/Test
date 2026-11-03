import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import RoomsRail from "@/components/home/RoomsRail";
import Experiences from "@/components/home/Experiences";
import GalleryMarquee from "@/components/home/GalleryMarquee";
import FilmSection from "@/components/home/FilmSection";
import LocationSection from "@/components/home/LocationSection";
import GuestNotes from "@/components/home/GuestNotes";
import JournalTeaser from "@/components/home/JournalTeaser";
import ClosingCTA from "@/components/home/ClosingCTA";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <RoomsRail />
      <Experiences />
      <GalleryMarquee />
      <FilmSection />
      <LocationSection />
      <GuestNotes />
      <JournalTeaser />
      <ClosingCTA />
    </>
  );
}
