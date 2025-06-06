const { createApp } = Vue;

createApp({
  data() {
    return {
      email: '',
      password: '',
      logueado: false,
      funciones: [],
      obraSeleccionada: null,
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo: this.email, contraseña: this.password }),
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.logueado = true;
            alert("Login correcto");
            this.cargarFunciones();
          } else {
            alert("Correo o contraseña incorrectos");
          }
        });
      } else {
        alert("Completa los campos");
      }
    },
    cargarFunciones() {
      fetch('http://localhost:3000/funciones')
        .then(res => res.json())
        .then(data => {
          this.funciones = data;
        });
    },
    seleccionarFuncion(funcion) {
      this.obraSeleccionada = funcion;
      // Guardar temporalmente en localStorage para pasar a asientos.html
      localStorage.setItem("funcionSeleccionada", JSON.stringify(funcion));
      window.location.href = "asientos.html";
    }
  }
}).mount('#app');