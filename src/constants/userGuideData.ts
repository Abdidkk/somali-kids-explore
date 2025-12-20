export interface GuideItem {
    id: string;
    video: string;
    description: string;
  }
  
  export const USER_GUIDE_DATA: GuideItem[] = [

    { id: 'start-learning', video: "/Video/Dugsi.mp4", description: 'Sådan starter du læring?' },
    { id: 'child-switching', video: "/Video/Dugsi.mp4", description: 'Sådan skifter du mellem børn?' },
    { id: 'category-control', video: "/Video/Dugsi.mp4", description: 'Sådan bruger du Kategori Kontrol?' },
    { id: 'reset-data', video: '', description: 'Hvordan nulstiller jeg data?' },
    { id: 'delete-account', video: "/Video/Dugsi.mp4", description: 'Hvordan sletter jeg min konto?' },
    { id: 'manage-children', video: '', description: 'Hvordan administrerer jeg børneprofiler?' },
    { id: 'start-learning', video: '', description: 'Kom godt i gang med læring' }
  ];
  