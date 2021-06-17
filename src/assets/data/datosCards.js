import img1 from "../img/1.png";
import img2 from "../img/2.png";
import img3 from "../img/3.png";
import img4 from "../img/4.png";

let data = [
    [
        {
            "title":"OMS",
            "text":`La OMS recomienda que el 100% de las donaciones de sangre que se
            realizan en los países sean de manera voluntaria`,
            "url":"https://www.who.int/images/default-source/infographics/who-emblem.png?sfvrsn=877bb56a_2",
            "alt":"Espacio"
        },
        {
            "title":"México",
            "text":`En 2017, en México se tuvo un índice de donaciones
            voluntarias de 5.2%, el más bajo en toda América Latina`,
            "url":"https://atlasviajero.com/wp-content/uploads/2020/10/mapa-mexico-2.jpg",
            "alt":"Espacio"
        },
        {
            "title":"Donaciones necesarias",
            "text":`Aprox. el 85.6% de las personas que han donaron sangre fue porque algún familiar o conocido lo necesitaba,`,
            "url":"https://med.unne.edu.ar/notimed/wp-content/uploads/2019/11/Screenshot_2019-06-11-13-58-32-824_com.android.chrome.jpg",
            "alt":"Espacio"
        },
        {
            "title":"Donaciones voluntarias",
            "text":`En México sólo el 13.5% de los donadores lo realizó de manera voluntaria`,
            "url":"https://www.sistemasanaliticos.com/wp-content/uploads/2020/04/donar-sangre-2.jpg",
            "alt":"Espacio"
        }
    ],
    [    {
        "title":"Tipo A",
        "text":"El grupo sanguineo A lo tiene aproximadamente el 27 % de la población en México",
        "url":img1,
        "alt":"Espacio"
    },
    {
        "title":"Tipo B",
        "text":"El grupo sanguineto B lo presenta aproximadamente el 10 % de la población en México",   
        "url":img2,
        "alt":"texas"
    },
    {
        "title":"Tipo AB",
        "text":"El grupo sanguineo AB lo presenta solo el 4% de la población Méxicana",   
        "url":img3,
        "alt":"texas"
    },
    {
        "title":"Tipo O",
        "text":"el tipo mayoritario en mexico es el O con 59 por ciento. Esto representa aprox 75 millones e personas",   
        "url":img4,
        "alt":"texas"
    }],
    [
        {
            "title":"Tres vidas",
            "text":`Al donar una unidad de sangre puedes contribuir a salvar tres vidas, ya que la sangre
            como la conocemos no solo cuenta con eritrocitos, contiene varios componentes que pueden ser separados 
            dependiendo de las tecnologias empleadas`,
            "url":"https://med.unne.edu.ar/notimed/wp-content/uploads/2019/11/Screenshot_2019-06-11-13-58-32-824_com.android.chrome.jpg",
            "alt":"Espacio"
        },
        {
            "title":"Plasma",
            "text":`El plasma es rico en proteinas, minerales y nutrientes en general, 
            así como anticuerpos siendo utilizado en procesos de deshiratación en bebes, como tratamiento alternativo
            al transferir lo anticuerpos de personas inmunizadas a pacientes con infecciones especificas.`,
            "url":"https://media.istockphoto.com/photos/bag-of-plasma-picture-id510569192?s=612x612",
            "alt":"plasma"
        },
        {
            "title":"Plaquetas",
            "text":`Las plaquetas son responsables de la formación de los coagulos que 
            evitan el sangrao cuando se genera una herida, el concentrao plaquerario se 
            utiliza en pacientes que no generan estas celulas o las generan enforma eficiente, lo que produce 
            una mayor probabilidad de hemorragía`,
            "url":"https://conceptodefinicion.de/wp-content/uploads/2018/07/Plaquetas-2.jpg",
            "alt":"Espacio"
        },
        {
            "title":"Eritrocitarios",
            "text":`En perdidas abundantes de sangre se produce
            un estado de anemia lo que limita el Oxigeno que llega a los tejidos por lo que
            se utilizan los concentrados eritrocitarios para incrementar los eritrocitos y así incrementar el transporte de 
            oxigeno hacia los tejidos`,
            "url":"data:image/jpeg;base64,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",
            "alt":"Espacio"
        }

    ]
]

export default data;