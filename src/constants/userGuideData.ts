export interface GuideItem {
    id: string;
    video: string;
    description: string;
  }
  
  export const USER_GUIDE_DATA: GuideItem[] = [

    { id: 'start-learning', video: "/Video/S1.mp4", description: 'Sådan starter du læring?' },
    { id: 'child-switching', video: "/Video/S2.mp4", description: 'Sådan skifter du mellem børn?' },
    { id: 'category-control', video: "/Video/S3.mp4", description: 'Sådan bruger du Kategori Kontrol?' },
    { id: 'reset-data', video: "/Video/S4.mp4", description: 'Hvordan nulstiller jeg data?' },
    { id: 'delete-account', video: "/Video/S5.mp4", description: 'Hvordan sletter jeg min konto?' },
  ];
  