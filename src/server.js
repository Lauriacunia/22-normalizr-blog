import express, { json, urlencoded } from "express";
import { normalize, schema, denormalize } from 'normalizr';
import { inspect } from "util";
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

const originalData = {
  id: "999",
  posts: [
    {
      id: "123",
      author: {
        id: "1",
        nombre: "Pablo",
        apellido: "Perez",
        DNI: "20442654",
        direccion: "CABA 123",
        telefono: "1567876547",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "324",
          commenter: {
            id: "2",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543",
          },
        },
        {
          id: "325",
          commenter: {
            id: "3",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20446938",
            direccion: "CABA 789",
            telefono: "1567291542",
          },
        },
      ],
    },
    {
      id: "1123",
      author: {
        id: "2",
        nombre: "Nicole",
        apellido: "Gonzalez",
        DNI: "20442638",
        direccion: "CABA 456",
        telefono: "1567811543",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "1324",
          commenter: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            DNI: "20442654",
            direccion: "CABA 123",
            telefono: "1567876547",
          },
        },
        {
          id: "1325",
          commenter: {
            id: "3",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20446938",
            direccion: "CABA 789",
            telefono: "1567291542",
          },
        },
      ],
    },
    {
      id: "2123",
      author: {
        id: "3",
        nombre: "Pedro",
        apellido: "Mei",
        DNI: "20446938",
        direccion: "CABA 789",
        telefono: "1567291542",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "2324",
          commenter: {
            id: "2",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543",
          },
        },
        {
          id: "2325",
          commenter: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            DNI: "20442654",
            direccion: "CABA 123",
            telefono: "1567876547",
          },
        },
      ],
    },
  ],
};

/** Definir schema de users */
const userSchema = new schema.Entity("users");

/** Definir schema cometarios */
const commentSchema = new schema.Entity("comments", {
  commenter: userSchema,
  });

/** Definir schema de un post */

const singlePostSchema = new schema.Entity("posts", {
  author: userSchema,
  title: "",
  comments: [commentSchema],
});

/** Definir schema de blog (array de posts) */
const blogSchema = new schema.Entity("blog", {
  posts: [singlePostSchema],
});

/** Normalizar Original Data */
const blogNormalized = normalize(originalData, blogSchema);

console.log(
  "Data original sin normalizar. Tamaño:",
  JSON.stringify(originalData).length
);
console.log(
  "Data normalizada. Tamaño:",
  JSON.stringify(blogNormalized).length
);

function print(obj) {
  console.log(inspect(obj, { depth: null }));
}

print(blogNormalized);


/** Calcular el procentaje de ahorro de data */
const ahorro = ((JSON.stringify(originalData).length - JSON.stringify(blogNormalized).length) / JSON.stringify(originalData).length) * 100;
// redondear a entero y mostrar en porcentaje
print(`El procentaje de ahorro de data es: ${Math.round(ahorro)} %`);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
