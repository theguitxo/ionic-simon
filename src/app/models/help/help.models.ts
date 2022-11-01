/**
 * EN: Interface with the information for any slide in the help page.
 * 
 * ES: Interfaz con la información de cualquier diapositiva en la página de ayuda.
 */
export interface SlideData {
  /**
   * EN: Title for the slide.
   * 
   * ES: Título de la diapositiva.
   */
  title: string;
  /**
   * EN: Path to the image shown in the slide.
   * 
   * ES: Ruta a la imagen que se muestra en la diapositiva.
   */  
  imagePath: string;
  /**
   * EN: Text of the slide.
   * 
   * ES: Texto de la diapositiva.
   */
  text: string;
}

/**
 * EN: Interface with the information for the links for the 'About' section in the help page.
 * 
 * ES: Interfaz con la información de los enlaces de la sección 'Acerca de' en la página de ayuda.
 */
export interface HelpAboutLink {
  /**
   * EN: Sentence with the information about the link.
   * 
   * ES: Frase con la información sobre el enlace.
   */
  sentence: string;
  /**
   * EN: Text of the button that navigates to the link.
   * 
   * ES: Texto del botón que navega al enlace.
   */
  button: string;
  /**
   * EN: Link that it is described the previous sentence.
   * 
   * ES: Enlace que se describe en la frase anterior.
   */
  url: string;
}
