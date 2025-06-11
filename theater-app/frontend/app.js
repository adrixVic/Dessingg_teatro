const { createApp } = Vue;

createApp({
  data() {
    return {
      funcionSeleccionada: null,
      asientos: [],
      email: '',
      password: '',
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
      ]
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
    toggleSeleccion(asiento) {
      if (asiento.estado === 'ocupado') return;
      asiento.seleccionado = !asiento.seleccionado;
    },
    generarAsientos() {
      const totalAsientos = 140;
      const asientos = [];
      for (let i = 1; i <= totalAsientos; i++) {
        const estado = Math.random() < 0.3 ? 'ocupado' : 'disponible';
        asientos.push({ id: i, estado, seleccionado: false });
      }
      this.asientos = asientos;
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

      // Guardar detalles de compra para la página de pago
      localStorage.setItem("compraPendiente", JSON.stringify(detallesCompra));

      // Redirigir a la página de pagos
      window.location.href = "pagos.html";
    },
    login() {
      if (!this.email || !this.password) {
        alert("Por favor, ingresa tus credenciales.");
        return;
      }

      window.location.href = "funciones.html";
    },
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
    }
  },
  created() {
    const data = localStorage.getItem("funcionSeleccionada");
    if (data) {
      this.funcionSeleccionada = JSON.parse(data);
      this.generarAsientos();
    } else if (window.location.pathname.includes("asientos.html")) {
      alert("No se ha seleccionado ninguna función.");
      window.location.href = "funciones.html";
    }
  }
}).mount('#app');