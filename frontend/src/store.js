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

const customFetch = async (
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
  selectedKlasse: '',
  selectedFach: '',

  setFach: (selectedFach) => {
    set({ selectedFach });
  },

  setKlasse: (selectedKlasse) => {
    set({ selectedKlasse });
  },

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

  login: async (e) => {
    e.preventDefault();
    customFetch(backendPath + '/login', 'POST', {
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
  weeklyData: [],
  addingCategory: false,
  addingUnit: false,

  setUnitArray: (unitArray) => {
    set({ unitArray });
  },

  setWeeklyData: (weeklyData) => {
    set({ weeklyData });
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

  getSchueler: async () => {
    return customFetch(backendPath + '/schueler');
  },

  setKalenderBemerkungenArray: (kalenderBemerkungenArray) => {
    set({ kalenderBemerkungenArray });
  },

  getKalenderBemerkungen: async () => {
    const res = customFetch(backendPath + '/kalenderBemerkungen');

    return res;
  },

  addKalenderBemerkungen: async (e) => {
    e.preventDefault();
    customFetch(backendPath + '/kalenderBemerkungen', 'POST', {});
  },

  getArticles: async () => {
    const res = customFetch(backendPath + '/articles');

    return res;
  },

  getFaecher: async () => {
    return customFetch(backendPath + '/faecher');
  },

  getUnterricht: async () => {
    return customFetch(backendPath + '/unterricht');
  },

  getWeeklyData: async () => {
    return customFetch(backendPath + '/kalenderBemerkungen');
  },

  validateNumber: () => {
    let value = parseFloat(document.getElementById('price').value);
    document.getElementById('price').value = value.toFixed(2);
  },

  sendWeeklyData: async (weekDay) => {
    const { getWeeklyData, setWeeklyData } = get();

    if (document.getElementById(weekDay).value === '') {
      return;
    }
    customFetch(backendPath + '/kalenderBemerkungen', 'POST', {
      bemerkung: document.getElementById(weekDay).value,
      datum: '2020-01-01',
      unterrichtId: 1,
    })
      .then((res) => {
        getWeeklyData().then((json) => {
          let i = 0;
          let helperArray = [];
          json.map((el) => helperArray.push(el.bemerkung));

          setWeeklyData(helperArray);
        });
      })
      .catch((err) => {
        // replaceAnimatedElement(err.message, true);
      });
  },

  addFaecher: async (e) => {
    const { getCategory, setCategoryArray } = get();
    e.preventDefault();

    customFetch(backendPath + '/faecher', 'POST', {
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

  addKlassen: async () => {
    const { setUnitArray, selectedKlasse } = get();
    if (selectedKlasse.bezeichnung) {
      customFetch(backendPath + '/klassen', 'POST', {
        bezeichnung: selectedKlasse.bezeichnung,
        lehrerId: sessionStorage.getItem('lehrerId'),
      })
        .then((res) => {
          setUnitArray(res.rows);
        })
        .catch((err) => {
          // replaceAnimatedElement(err.message, true);
        });
    }
  },

  getKlassen: async () => {
    return customFetch(backendPath + '/klassen');
  },

  submitStudentInfo: async (e) => {
    e.preventDefault();
    customFetch(backendPath + '/studentInfo', 'POST', {
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
