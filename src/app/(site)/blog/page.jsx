import Link from 'next/link';
import CtaBand from '@/components/site/CtaBand';
import { PageHero } from '@/components/site/blocks';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { whatsappLink } from '@/data/site';

export const metadata = { title: 'Blog', description: 'Guides and project stories from the Nexuz Hub workshop in Coimbatore.' };


export default function BlogPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Blog' }]} eyebrow="Workshop notes" title={['Fresh articles', <span key="b" className="text-gold-deep">on the way.</span>]} intro="We’re getting our first guides and project stories ready. Check back soon — or message us on WhatsApp with a question and we’ll help right away.">
        <div className="flex flex-wrap gap-3">
          <a href={whatsappLink('Hi Nexuz Hub! I have a question.')} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            <WhatsAppIcon size={17} /> Ask a question
          </a>
          <Link href="/faq" className="btn btn-line">
            Read the FAQ <Icon name="arrow" size={16} />
          </Link>
        </div>
      </PageHero>
      <CtaBand title="Have a project in mind? Let’s make it." />
    </>
  );
}
