import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { cmsApi } from '../services/api';
import {
  foundation as defaultFoundation,
  mission as defaultMission,
  values as defaultValues,
  impactStats as defaultImpact,
  programmes as defaultProgrammes,
  galleryStories as defaultGallery,
  reportTypes as defaultReports,
} from '../data/content';

type SiteData = {
  foundation: typeof defaultFoundation;
  home_hero: Record<string, string>;
  mission: string[];
  values: string[];
  impact: typeof defaultImpact;
  programmes: typeof defaultProgrammes;
  gallery: typeof defaultGallery;
  reports: string[];
};

const defaults: SiteData = {
  foundation: defaultFoundation,
  home_hero: {
    eyebrow: defaultFoundation.legalName,
    title: defaultFoundation.shortName,
    subtitle: defaultFoundation.tagline,
    description:
      'Working towards a more equitable, educated, healthier and environmentally sustainable society.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=80',
    primaryCtaLabel: 'Our Programmes',
    primaryCtaLink: '/programmes',
    secondaryCtaLabel: 'Donate Now',
    secondaryCtaLink: '/donate',
  },
  mission: defaultMission,
  values: defaultValues,
  impact: defaultImpact,
  programmes: defaultProgrammes,
  gallery: defaultGallery,
  reports: defaultReports,
};

const ContentContext = createContext<SiteData>(defaults);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaults);

  useEffect(() => {
    cmsApi
      .getPublicContent()
      .then((payload) => {
        setData({
          foundation: (payload.foundation as SiteData['foundation']) || defaults.foundation,
          home_hero: (payload.home_hero as SiteData['home_hero']) || defaults.home_hero,
          mission: (payload.mission as string[]) || defaults.mission,
          values: (payload.values as string[]) || defaults.values,
          impact: (payload.impact as SiteData['impact']) || defaults.impact,
          programmes:
            (payload.programmes as SiteData['programmes']) || defaults.programmes,
          gallery: (payload.gallery as SiteData['gallery']) || defaults.gallery,
          reports: (payload.reports as string[]) || defaults.reports,
        });
      })
      .catch(() => {
        // Keep static defaults if API is offline
      });
  }, []);

  const value = useMemo(() => data, [data]);
  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(ContentContext);
}
