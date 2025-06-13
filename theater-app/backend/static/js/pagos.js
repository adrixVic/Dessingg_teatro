const { createApp } = Vue;

createApp({
  data() {
    return {
      metodoPago: 'tarjeta', // Puede ser 'tarjeta' o 'qr'
      tarjeta: {
        nombre: '',
        numero: '',
        expiracion: '',
        cvv: ''
      },
      codigoQR: ''
    };
  },
  methods: {
    procesarPagoTarjeta() {
      const { nombre, numero, expiracion, cvv } = this.tarjeta;

      if (!nombre || !numero || !expiracion || !cvv) {
        alert("Por favor, completa todos los campos de la tarjeta.");
        return;
      }
      if (numero.length !== 16 || isNaN(numero)) {
        alert("Número de tarjeta inválido.");
        return;
      }
      if (cvv.length !== 3 || isNaN(cvv)) {
        alert("CVV inválido.");
        return;
      }

      alert(`Pago con tarjeta realizado correctamente.\nGracias, ${nombre}`);
    },
    generarCodigoAlfanumerico() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let codigo = "";
      for (let i = 0; i < 16; i++) {
        codigo += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.codigoQR = codigo;
    },
    generarQR() {
      const canvas = document.getElementById('qrCanvas');
      if (!canvas || !this.codigoQR) return;

      QRCode.toCanvas(canvas, this.codigoQR, { width: 200 }, function (error) {
        if (error) console.error("Error al generar QR:", error);
      });
    },
    cerrarSesion() {
      // Elimina cualquier dato de sesión (si usas alguno)
      localStorage.clear();
      sessionStorage.clear();

      // Redirige al login (ajusta la ruta si es diferente)
      window.location.href = '/login';
    }
  },
  watch: {
    metodoPago(nuevoMetodo) {
      if (nuevoMetodo === 'qr') {
        this.generarCodigoAlfanumerico();
      }
    },
    codigoQR() {
      this.generarQR();
    }
  },
  mounted() {
    if (this.metodoPago === 'qr') {
      this.generarCodigoAlfanumerico();
    }
  }
}).mount('#app');