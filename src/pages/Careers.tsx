import { HeartHandshake, MessageSquare, ShieldCheck, Users } from "lucide-react";
import Layout from "../components/Layout";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import { useSeo } from "../lib/useSeo";

const qualities = [
  { icon: HeartHandshake, title: "Genuine Compassion", description: "A real, patient care for children and their families." },
  { icon: MessageSquare, title: "Clear Communication", description: "Keeping families informed, always." },
  { icon: ShieldCheck, title: "Reliability", description: "Families need to be able to count on you." },
  { icon: Users, title: "Professional Conduct", description: "Holding to Serene Hands' standards of care." },
];

export default function Careers() {
  useSeo({
    title: "Careers — Join Our Caregiver Team",
    description: "Join the Serene Hands caregiver team and help children with special needs learn, grow and thrive at home.",
  });

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-5 pb-12 pt-14 text-center sm:px-8 sm:pt-20">
        <SectionHeading
          eyebrow="Join Our Team"
          title="Great care starts with great people."
          description="Serene Hands is looking for patient, compassionate caregivers who want to make a real difference in the life of a child with special needs."
          align="center"
        />
        <div className="mt-8">
          <Button to="/careers/apply" size="lg">Apply Now</Button>
        </div>
      </section>

      <section className="bg-blush/40 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading eyebrow="What We Look For" title="Qualities every Serene Hands caregiver brings." align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {qualities.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-blush-deep bg-cloud p-6 text-center">
                <Icon size={26} className="mx-auto text-sage" />
                <h3 className="mt-4 font-display text-base font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="Growing Together" title="A team built as Serene Hands grows." />
        <p className="mt-5 text-balance leading-relaxed text-ink-soft">
          As Serene Hands grows into a structured care organization, caregivers
          are trained and supported with clear standards and consistent
          scheduling — not left to figure things out alone.
        </p>
        <div className="mt-8">
          <Button to="/careers/apply" size="lg">Join the Serene Team</Button>
        </div>
      </section>
    </Layout>
  );
}
