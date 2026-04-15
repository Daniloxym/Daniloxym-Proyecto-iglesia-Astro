// Popula el DOM antes de que cualquier módulo bajo test lo consulte con querySelector.
document.body.innerHTML = `
  <form class="formulario">
    <input class="formulario__nombre" name="nombre" value="" />
    <p class="error" id="error-nombre"></p>

    <input class="formulario__correo" name="email" type="email" value="" />
    <p class="error" id="error-email"></p>

    <input class="formulario__tema" name="asunto" value="" />
    <p class="error" id="error-asunto"></p>

    <textarea class="formulario_mensaje" name="mensaje"></textarea>
    <p class="error" id="error-mensaje"></p>

    <input type="checkbox" id="consentimiento" />
    <p class="error" id="error-consentimiento"></p>

    <button type="submit">Enviar mensaje</button>
  </form>
`;
