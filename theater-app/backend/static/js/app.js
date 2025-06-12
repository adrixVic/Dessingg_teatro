const { createApp } = Vue;

createApp({
  data() {
    return {
      // Datos de login y registro
      nombre: "",
      correo: "",
      ci: "",
      direccion: "",
      telefono: "",
      contrasena: "",

      // Funciones y selección
      funcionSeleccionada: null,
      funciones: [
        {
          id: 1,
          nombre: "La Casa de Bernarda Alba",
          descripcion: "Drama clásico sobre la represión y el poder.",
          imagen: "../assets/fun1.jpg",
          opciones: [
            { fecha: "12/06/2025", hora: "18:00", precio: 30 },
            { fecha: "13/06/2025", hora: "20:00", precio: 35 }
          ]
        },
        {
          id: 2,
          nombre: "Sueño de una Noche de Verano",
          descripcion: "Comedia mágica de Shakespeare.",
          imagen: "../assets/fun2.webp",
          opciones: [
            { fecha: "15/06/2025", hora: "19:00", precio: 28 },
            { fecha: "16/06/2025", hora: "21:00", precio: 32 }
          ]
        },
        {
          id: 3,
          nombre: "El Principito",
          descripcion: "Obra adaptada del clásico literario.",
          imagen: "../assets/fun3.png",
          opciones: [
            { fecha: "18/06/2025", hora: "17:00", precio: 25 },
            { fecha: "19/06/2025", hora: "19:00", precio: 27 }
          ]
        },
        {
          id: 4,
          nombre: "Bodas de Sangre",
          descripcion: "Tragedia de amor y muerte de Lorca.",
          imagen: "../assets/fun5.jfif",
          opciones: [
            { fecha: "20/06/2025", hora: "18:30", precio: 29 },
            { fecha: "21/06/2025", hora: "20:30", precio: 34 }
          ]
        }
      ],

      // Asientos
      asientos: []
    };
  },

  computed: {
    asientosSeleccionados() {
      return this.asientos.filter(a => a.seleccionado);
    },
    cantidadSeleccionados() {
      return this.asientosSeleccionados.length;
    },
    totalAPagar() {
      if (!this.funcionSeleccionada) return 0;
      return this.cantidadSeleccionados * this.funcionSeleccionada.precio;
    }
  },

  methods: {
    // ---------------------- AUTENTICACIÓN ---------------------
    async registrar() {
      if (!this.nombre || !this.correo || !this.contrasena) {
        alert("Completa todos los campos requeridos.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: this.nombre,
          correo: this.correo,
          ci: this.ci,
          direccion: this.direccion,
          telefono: this.telefono,
          contrasena: this.contrasena
        }),
      });

      const data = await response.json();
      alert(data.mensaje || data.error);
      if (response.ok) window.location.href = "login.html";
    },

    async login() {
      if (!this.email || !this.password) {
        alert("Por favor, ingresa tus credenciales.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: this.email,
          contrasena: this.password
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Bienvenido");
        localStorage.setItem("usuario", JSON.stringify(data.usuario)); // opcional
        window.location.href = "funciones.html";
      } else {
        alert(data.error);
      }
    },

    // ---------------------- FUNCIONES Y ASIENTOS ---------------------
    seleccionarFuncion(funcion, opcion) {
      const seleccion = {
        id: funcion.id,
        nombre: funcion.nombre,
        descripcion: funcion.descripcion,
        imagen: funcion.imagen,
        fecha: opcion.fecha,
        hora: opcion.hora,
        precio: opcion.precio
      };
      localStorage.setItem("funcionSeleccionada", JSON.stringify(seleccion));
      window.location.href = "asientos.html";
    },

    generarAsientos() {
      const totalAsientos = 140;
      this.asientos = Array.from({ length: totalAsientos }, (_, i) => ({
        id: i + 1,
        estado: Math.random() < 0.3 ? 'ocupado' : 'disponible',
        seleccionado: false
      }));
    },

    toggleSeleccion(asiento) {
      if (asiento.estado === 'ocupado') return;
      asiento.seleccionado = !asiento.seleccionado;
    },

    comprar() {
      if (this.cantidadSeleccionados === 0) {
        alert("Por favor, selecciona al menos un asiento.");
        return;
      }

      const detallesCompra = {
        funcion: this.funcionSeleccionada,
        asientos: this.asientosSeleccionados.map(a => a.id),
        total: this.totalAPagar
      };

      localStorage.setItem("compraPendiente", JSON.stringify(detallesCompra));
      window.location.href = "pagos.html";
    }
  },

  created() {
    // Si estamos en asientos.html, cargar función y generar asientos
    if (window.location.pathname.includes("asientos.html")) {
      const data = localStorage.getItem("funcionSeleccionada");
      if (data) {
        this.funcionSeleccionada = JSON.parse(data);
        this.generarAsientos();
      } else {
        alert("No se ha seleccionado ninguna función.");
        window.location.href = "funciones.html";
      }
    }
  }

}).mount("#app");