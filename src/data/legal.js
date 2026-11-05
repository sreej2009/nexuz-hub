// Legal page content from the original site. Each section: heading, paragraphs, optional list.
import { SITE } from './site';

export const LEGAL = {
  'privacy-policy': {
    title: 'Privacy Policy',
    eyebrow: 'Data protection guidelines',
    intro:
      'Nexuz Hub is a creative manufacturing facility based in Saravanampatti, Coimbatore, offering UV printing, laser cutting & engraving, 3D printing, custom gifts, and sign boards. We are committed to protecting your privacy and handling your information transparently.',
    sections: [
      {
        heading: 'Nexuz Hub privacy policy',
        body: [
          'This Privacy Policy describes how your personal information is collected, used, and shared when you visit this website or request a quote or order from Nexuz Hub (the "Site").',
        ],
      },
      {
        heading: 'Personal information we collect',
        body: [
          'When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and cookies installed on your device. Additionally, as you browse the Site, we collect information about the individual pages you view, what websites or search terms referred you to the Site, and how you interact with the Site. We call this automatically-collected information "Device Information."',
        ],
        list: [
          'Cookies – Data files placed on your device, often including an anonymous unique identifier. (Learn more about cookies and how to disable them: http://www.allaboutcookies.org)',
          'Log Files – Track actions on the Site and collect IP address, browser type, ISP, referring/exit pages, and timestamps.',
          'Web Beacons, Tags, and Pixels – Electronic files to monitor site usage and interaction.',
          'Google Analytics and Pixels – Collect traffic-related information and interaction behavior.',
        ],
      },
      {
        heading: 'How we use your personal information',
        body: ['We use the collected Order Information to:'],
        list: [
          'Process your orders, payments, and generate invoices',
          'Communicate with you',
          'Screen for potential fraud or risks',
          'Provide you with information or promotions related to our services, when aligned with your preferences',
        ],
        after: ['We use the collected Device Information to:'],
        list2: [
          'Improve and optimize the Site experience',
          'Analyze customer interactions for performance tracking',
          'Screen for potential risk and fraud',
        ],
      },
      {
        heading: 'Sharing your personal information',
        body: ['We share your Personal Information with trusted third-party service providers to help us operate effectively:'],
        list: [
          'Google Analytics: To understand customer interactions and optimize experience (Learn more: Google Privacy Policy)',
          'Payment processors, for orders paid online',
        ],
      },
      {
        heading: 'Your rights',
        body: ['If you are a resident of the European Economic Area (EEA):'],
        list: [
          'You have the right to access, update, or delete your personal information.',
          `If you wish to exercise these rights, please contact us at ${SITE.email}`,
        ],
      },
      {
        heading: 'Do not track',
        body: [`Please note, we do not alter our Site's data collection practices when we detect a "Do Not Track" signal from your browser.`],
      },
      { heading: 'Data retention', body: ['We will retain your Order Information for our records unless you ask us to delete this information.'] },
      { heading: 'Minors', body: ['Our Site is not intended for individuals under the age of 18.'] },
      {
        heading: 'Changes',
        body: ['We may update this Privacy Policy periodically to reflect changes to our practices or for other operational, legal, or regulatory reasons.'],
      },
    ],
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    eyebrow: 'Terms of use',
    intro:
      'This website (hereafter referred to as the site) is owned and operated by Nexuz Hub (hereafter referred to as Nexuz Hub, we, us, or our), a creative manufacturing facility based in Saravanampatti, Coimbatore.',
    preface: [
      'Please carefully read, review, and understand our Terms and Conditions before using this website or requesting any services from Nexuz Hub. Your access to and use of this website, and any order placed with us, indicate that you accept and agree to be bound by these terms and conditions.',
      'If you do not agree with these terms, you should leave the site immediately and not use any of the materials or services available here.',
    ],
    sections: [
      {
        heading: 'Limitation of liability',
        body: [
          'Under no circumstances shall Nexuz Hub be liable for any direct, indirect, incidental, special, or consequential damages, including but not limited to loss of profits or business interruption, arising out of the use, or inability to use, this site or the products and services ordered through it, even if Nexuz Hub or an authorized representative has been advised of the possibility of such damages.',
          'You are responsible for reviewing every quote, design proof, and specification carefully before approving production. Nexuz Hub is not liable for costs arising from errors in artwork, dimensions, or instructions that were approved by you prior to production.',
        ],
      },
      {
        heading: 'Quotes & orders',
        body: [
          'All quotes provided by Nexuz Hub are estimates based on the files, materials, and quantities you describe to us, and may change if the specification changes. Production begins only after you confirm the quote and design proof, whether over WhatsApp, email, or in person.',
          'Turnaround times shown on this site are typical estimates, not guarantees, and may vary by material, finish, and order volume. You are responsible for supplying print-ready files; additional design work may incur extra charges.',
        ],
      },
      {
        heading: 'Ownership and intellectual property',
        body: [
          "Any artwork, photos, logos, or files you supply for your order remain your property, and you confirm that you have the right to use and reproduce them. Nexuz Hub reserves the right to decline any job that appears to infringe another party's copyright or trademark.",
          'Site content, photography, and designs created by Nexuz Hub for our own marketing remain our property. Our products and services are provided "as is", and Nexuz Hub is not liable for losses or damages resulting from the use or inability to use this site.',
          'Custom design work created by Nexuz Hub specifically for your order belongs to you once the order is paid in full, unless otherwise agreed in writing.',
        ],
      },
      {
        heading: 'Refund policy',
        body: [
          "Because most orders are custom-made to your specifications, refunds are handled differently from a standard retail purchase. If a finished item has a manufacturing defect or does not match the approved proof, contact us within 48 hours of delivery and we'll arrange a reprint, repair, or refund. See our full refund policy for details.",
        ],
        link: { href: '/refund-policy', label: 'Read the refund policy' },
      },
      {
        heading: 'Warranty',
        body: [
          "Nexuz Hub warrants that finished products are free of manufacturing defects at the time of delivery. This warranty does not cover damage from misuse, normal wear, exposure to weather beyond a product's intended use, or errors present in artwork or specifications that you approved before production.",
        ],
      },
      {
        heading: 'Refusal of service',
        body: ['Nexuz Hub reserves the right to decline or cancel an order for reasons including but not limited to:'],
        list: [
          'Requests for content that is illegal, infringing, or intended to deceive',
          'Abusive, threatening, or malicious behavior towards Nexuz Hub staff',
          'Non-payment of an agreed advance or outstanding balance',
          'Providing false or misleading order details',
          'Specifications that our equipment or materials cannot safely produce',
        ],
      },
      {
        heading: 'Privacy policy',
        body: [
          'We value your privacy. Nexuz Hub does not sell, rent, or share your personal information with third parties. Your data is used solely for purposes such as:',
        ],
        list: ['Quoting and processing your order', 'Communicating with you about your order', 'Billing and GST invoicing', 'Preventing fraudulent or abusive requests', 'Legal compliance'],
        after: ["By using Nexuz Hub's services, you consent to the collection and use of your data as described in our Privacy Policy."],
        link: { href: '/privacy-policy', label: 'Read the privacy policy' },
      },
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    eyebrow: 'Return and refund guidelines',
    intro:
      'At Nexuz Hub, we are committed to providing you with the best possible service and experience. Because most orders are custom-made to your specifications, refunds work differently from a standard retail purchase — this page explains when a reprint, repair, or refund applies.',
    sections: [
      {
        heading: '48-hour defect reporting window',
        body: [
          'If your finished order has a manufacturing defect or does not match the design proof you approved, let us know within 48 hours of delivery and we will make it right at no extra cost.',
        ],
      },
      {
        heading: 'Conditions for refund',
        body: ['You are eligible for a reprint, repair, or refund if:'],
        list: [
          'The finished item has a genuine manufacturing defect (e.g. misaligned print, cracked material, incorrect engraving).',
          'The finished item does not match the design proof or specification you approved.',
          'You report the issue within 48 hours of delivery, with photos where possible.',
          'The order was cancelled by you before production started.',
        ],
      },
      {
        heading: 'How to request a refund',
        steps: [
          {
            title: 'Reach out through our Contact page or WhatsApp.',
            body: "If you're experiencing any issues with a finished order, our team is here to help. Get in touch with your order details and a description of the issue.",
          },
          {
            title: 'Share your phone number, order details, and photos of the issue.',
            body: 'Once we receive this information, our team will review it and get back to you as soon as possible. Thank you for your cooperation!',
          },
          {
            title: 'Our team will review and process your request.',
            body: "We'll confirm whether a reprint, repair, or refund applies, and let you know the next steps.",
          },
        ],
        after: ['Refunds will be issued to the original payment method used for your order.'],
      },
      {
        heading: 'Non-refundable situations',
        body: ['Refunds do not apply in the following situations:'],
        list: [
          'Production has already started on a custom, made-to-order item and you simply change your mind.',
          'The defect is due to artwork, text, or dimensions you approved on the design proof.',
          'Normal wear, misuse, or damage occurring after delivery.',
          'The issue is reported more than 48 hours after delivery.',
        ],
      },
      {
        heading: 'Refund processing time',
        body: ['Once your refund is approved, it may take 5–7 business days for the amount to reflect in your account, depending on your payment method.'],
      },
      {
        heading: 'We appreciate your feedback',
        body: [
          'If you choose to request a refund, we would be grateful if you could let us know why. Your feedback helps us improve Nexuz Hub for future customers!',
        ],
      },
    ],
  },
};
