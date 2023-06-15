export type BannerType = {
  id?: string;
  button_text?: string;
  image?: string;
  link_to?: string;
  text?: string;
  text_color?: string;
  title?: string;
}

export type BlogpostType = {
  id?: string;
  image?: { fileId: string, fileName: string, title: string } | null;
  language?: {
    'en': {
      linkTo?: string;
      title?: string;
    },
    'de': {
      linkTo?: string;
      title?: string;
    }
  }
}

export const defaultBlogpost: BlogpostType = {
  image: null,
  language: {
    'en': {
      linkTo: '',
      title: '',
    },
    'de': {
      linkTo: '',
      title: '',
    }
  }
}

export type SalesBannerType = {
  id?: string;
  image?: { fileId: string, fileName: string, title: string } | null;
  language?: {
    'en': {
      linkTo?: string;
      title?: string;
    },
    'de': {
      linkTo?: string;
      title?: string;
    }
  }
}

export const defaultSalesBanner: SalesBannerType = {
  image: null,
  language: {
    'en': {
      linkTo: '',
      title: '',
    },
    'de': {
      linkTo: '',
      title: '',
    }
  }
}

export type EquipmentType = {
  id?: string;
  image?: { fileId: string, fileName: string, title: string } | null;
  language?: {
    'en': {
      linkTo?: string;
      title?: string;
    },
    'de': {
      linkTo?: string;
      title?: string;
    }
  }
}

export const defaultEquipment: EquipmentType = {
  image: null,
  language: {
    'en': {
      linkTo: '',
      title: '',
    },
    'de': {
      linkTo: '',
      title: '',
    }
  }
}

export type ExerciseType = {
  id?: string;
  video?: { fileId: string, fileName: string, title: string } | null;
  dificulty?: number;
  duration?: number;
  equipments?: string[];
  language?: {
    'en': {
      title?: string;
      description?: string;
    };
    'de': {
      title?: string;
      description?: string;
    }
  }
}

export const defaultExercise: ExerciseType = { 
  video: null, 
  dificulty: 0,
  duration: 0,
  equipments: [],
  language: {
    'en': {
      title: '',
      description: '',
    },
    'de': {
      title: '',
      description: ''
    }
  }
}

export type WorkoutType = {
  id?: string;
  dificulty?: number;
  duration?: number;
  exercises: string[];
  language?: {
    'en': {
      title?: string;
      description?: string;
    };
    'de': {
      title?: string;
      description?: string;
    }
  }
}

export const defaultWorkout: WorkoutType = { 
  dificulty: 0,
  duration: 0,
  exercises: [],
  language: {
    'en': {
      title: '',
      description: '',
    },
    'de': {
      title: '',
      description: ''
    }
  }
}

export type LessonType = {
  id?: string;
  video?: { fileId: string, fileName: string, title: string } | null;
  duration?: number;
  language?: {
    'en': {
      title?: string;
      description?: string;
    };
    'de': {
      title?: string;
      description?: string;
    }
  }
}

export const defaultLesson: LessonType = { 
  video: null, 
  duration: 0,
  language: {
    'en': {
      title: '',
      description: '',
    },
    'de': {
      title: '',
      description: ''
    }
  }
}

export type CourseType = {
  id?: string;
  image?: { fileId: string, fileName: string, title: string } | null;
  video?: { fileId: string, fileName: string, title: string } | null;
  duration?: number;
  dificulty?: number;
  lessons?: string[];
  language?: {
    'en': {
      title?: string;
      overview?: string;
    };
    'de': {
      title?: string;
      overview?: string;
    }
  };
  userAllowed?: boolean;
}

export const defaultCourse: CourseType = { 
  image: null,
  video: null, 
  duration: 0,
  dificulty: 0,
  lessons: [],
  language: {
    'en': {
      title: '',
      overview: '',
    },
    'de': {
      title: '',
      overview: ''
    }
  }
}

export type NotificationType = {
  id: string,
  title: string,
  body: string,
  url: string,
  createdAt: number,
}