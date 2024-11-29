function cardTemplate(article) {
  const { urlToImage, title, publisherdAt, content } = article;
  return ` <li class='card'>
      <img src="${urlToImage}" alt="${title}" class='img'/>
      <h2>${title}</h2>
      <h3>Date: ${publisherdAt}</h3>
      <p>${content}</p>
    </li>`;
}

export function newsTemplate(articles) {
  return articles.map(cardTemplate).join('');
}
