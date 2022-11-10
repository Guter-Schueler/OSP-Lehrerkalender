import create from 'zustand';
import cookie from 'js-cookie';

const fetchHeaderWithToken = {
  'Content-Type': 'application/json',
  'X-TOKEN': cookie.get('token'),
};
const backendPath = `${import.meta.env.VITE_BACKEND_HOST}:${
  import.meta.env.VITE_BACKEND_PORT
}`;
const frontendPath = `${import.meta.env.VITE_FRONTEND_HOST}:${
  import.meta.env.VITE_FRONTEND_PORT
}`;

const myfetch = async (
  path,
  method = 'GET',
  body = {},
  headers = fetchHeaderWithToken
) => {
  const options = {
    headers,
    method,
  };
  if (method === 'POST') {
    options.body = JSON.stringify(body);
  }

  const res = fetch(path, options).then(async (response) => {
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message, {
        cause: response.status,
      });
    }
    return response.json();
  });

  return res;
};

const userStore = create((set, get) => ({
  // all sites ---------------------------------------------------------------------------------------------------------------------
  userToken: cookie.get('token'),
  selectedDate: new Date(),
  klassenArray: [''],
  faecherArray: [''],

  setSelectedDate: (selectedDate) => {
    set({ selectedDate });
  },

  setKlassenArray: (klassenArray) => {
    set({ klassenArray });
  },

  setFaecherArray: (faecherArray) => {
    set({ faecherArray });
  },

  // Login ---------------------------------------------------------------------------------------------------------------------
  loginError: '',
  showBasePage: sessionStorage.getItem('showBasePage'),
  lehrerId: sessionStorage.getItem('lehrerId'),

  replaceAnimatedElement: (message, isError) => {
    const messageBox = document.getElementById('messageBox');
    messageBox.style.opacity = 1;
    messageBox.classList.toggle('errorBox', isError);
    messageBox.classList.toggle('successBox', !isError);
    messageBox.innerText = message;
    setTimeout(() => {
      messageBox.style.opacity = 0;
    }, 2000);
  },

  login: async (e) => {
    e.preventDefault();
    myfetch(backendPath + '/login', 'POST', {
      userName: document.getElementById('userName').value,
      password: document.getElementById('password').value,
    })
      .then((response) => {
        cookie.set('token', response.token);
        set({
          userToken: response.token,
          loginError: false,
          showBasePage: true,
        });
        sessionStorage.setItem('showBasePage', true);
        sessionStorage.setItem('lehrerId', response.lehrerId);
        
      })
      .catch((err) => {
        set({ loginError: 'Falscher Username oder Passwort!' });
      });
  },

  // Lehreransicht ---------------------------------------------------------------------------------------------------------------------
  categoryArray: [],
  unitArray: [],
  kalenderBemerkungenArray: [],
  addingCategory: false,
  addingUnit: false,

  replaceAnimatedElement: (message, isError) => {
    const messageBox = document.getElementById('messageBox');
    messageBox.style.opacity = 1;
    messageBox.classList.toggle('errorBox', isError);
    messageBox.classList.toggle('successBox', !isError);
    messageBox.innerText = message;
    setTimeout(() => {
      messageBox.style.opacity = 0;
    }, 2000);
  },

  setAddingCategory: (addingCategory) => {
    set({ addingCategory });
  },

  setAddingUnit: (addingUnit) => {
    set({ addingUnit });
  },

  setArticleArray: (articleArray) => {
    set({ articleArray });
  },

  setCategoryArray: (categoryArray) => {
    set({ categoryArray });
  },

  setUnitArray: (unitArray) => {
    set({ unitArray });
  },

  setKalenderBemerkungenArray: (kalenderBemerkungenArray) => {
    set({ kalenderBemerkungenArray });
  },

  getKalenderBemerkungen: async () => {
    const res = myfetch(backendPath + '/kalenderBemerkungen');

    return res;
  },

  addKalenderBemerkungen: async (e) => {
    e.preventDefault();
    myfetch(backendPath + '/kalenderBemerkungen', 'POST', {});
  },

  getArticles: async () => {
    const res = myfetch(backendPath + '/articles');

    return res;
  },

  getFaecher: async () => {
    return myfetch(backendPath + '/faecher');
  },

  addFaecher: async (e) => {
    const { getCategory, setCategoryArray } = get();
    e.preventDefault();

    myfetch(backendPath + '/faecher', 'POST', {
      // muss noch id vergeben werden
      //   bezeichnung: document.getElementById('userName').value,
      //   kuerzel: document.getElementById('password').value,
    })
      .then((res) => {
        getCategory().then((json) => {
          setCategoryArray(json);
        });

        // document.getElementById('userName').value = '';
        // document.getElementById('password').value = '';
      })
      .catch((err) => {
        // replaceAnimatedElement(err.message, true);
      });
  },

  getKlassen: async () => {
    return await myfetch(backendPath + '/klassen');
  },

  addKlassen: async (e) => {
    e.preventDefault();
    const { getKlassen, setUnitArray, replaceAnimatedElement } = get();

    myfetch(backendPath + '/klassen', 'POST', {
      //  Muss noch geändert werden.
      //   bezeichnung: document.getElementById('userName').value,
      //   kuerzel: document.getElementById('password').value,
    })
      .then((res) => {
        getKlassen().then((json) => {
          setUnitArray(json);
        });

        document.getElementById('userName').value = '';
        // replaceAnimatedElement(res.message, false);
      })
      .catch((err) => {
        // replaceAnimatedElement(err.message, true);
      });
  },

  submitStudentInfo: async (e) => {
    e.preventDefault();
    myfetch(backendPath + '/studentInfo', 'POST', {
      newItem: {
        mndNote: document.getElementById('oral-grading').value,
        writtenGrades: {
          exam1: document.getElementById('exam-1-grading').value,
          exam2: document.getElementById('exam-2-grading').value,
          exam3: document.getElementById('exam-3-grading').value,
        },
        bemerkung: document.getElementById('comment').value,
      },
    }).catch((err) => {
      console.error(err);
    });
  },
}));

export default userStore;
