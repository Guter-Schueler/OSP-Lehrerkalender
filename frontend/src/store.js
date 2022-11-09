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

  // Login ---------------------------------------------------------------------------------------------------------------------
  loginError: '',

  login: async (e) => {
    e.preventDefault();
    myfetch(backendPath + '/login', 'POST', {
      userName: document.getElementById('userName').value,
      password: document.getElementById('password').value,
    })
      .then((response) => {
        cookie.set('token', response.token);
        set({ userToken: response.token, loginError: false });
        return true;
      })
      .catch((err) => {
        set({ loginError: 'Falscher Username oder Passwort!' });
      });
  },

  // Lehreransicht ---------------------------------------------------------------------------------------------------------------------
  articleArray: [],
  categoryArray: [],
  unitArray: [],
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

  getArticles: async () => {
    const res = myfetch(backendPath + '/articles');

    return res;
  },

  getFaecher: async () => {
    const res = myfetch(backendPath + '/faecher');

    return res;
  },

  validateNumber: () => {
    let value = parseFloat(document.getElementById('price').value);
    document.getElementById('price').value = value.toFixed(2);
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

  getKlassen: async () => {
    const res = myfetch(backendPath + '/klassen');

    return res;
  },

  submit: async (e) => {
    e.preventDefault();
    const { getArticles, setArticleArray, replaceAnimatedElement } = get();
    myfetch(backendPath + '/articles', 'POST', {
      newItem: {
        description:
          document.getElementById('description').value.charAt(0).toUpperCase() +
          document.getElementById('description').value.slice(1),
        category: document.getElementById('category').value,
        price: document.getElementById('price').value,
        unit: document.getElementById('unit').value,
      },
    })
      .then((res) => {
        getArticles().then((json) => {
          setArticleArray(json);
        });
        document.getElementById('price').value = '';
        document.getElementById('description').value = '';
        replaceAnimatedElement(res.message, false);
      })
      .catch((err) => {
        replaceAnimatedElement(err.message, true);
      });
  },
}));

export default userStore;
