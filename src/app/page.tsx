import MainSection from "@/components/main-section/main-section";
import OurServices from "@/components/our-services-section/our-services";
import ScrollButton from "@/components/scroll-button/scroll-button";

export default async function Home() {
    return (
        <>
            <main className="relative flex-1">
                <MainSection />
                <OurServices />
                <ScrollButton />
            </main>
        </>
    );
}
