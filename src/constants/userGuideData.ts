export interface GuideItem {
    id: string;
    video: string;
    description: string;
  }
  
  export const USER_GUIDE_DATA: GuideItem[] = [
    { id: 'delete-account', video: "/Video/Dugsi.mp4", description: 'Hvordan sletter jeg min konto?' },
    { id: 'reset-data', video: '', description: 'Hvordan nulstiller jeg data?' },
    { id: 'manage-children', video: '', description: 'Hvordan administrerer jeg børneprofiler?' },
    { id: 'start-learning', video: '', description: 'Kom godt i gang med læring' }
  ];
  