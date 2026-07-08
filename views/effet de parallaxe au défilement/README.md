## Objectif

Faire en sorte que des éléments défilent plus ou moins vite lors du scroll de l'utilisateur

## Solution

On trouve la position du centre de l'élément par rapport au centre de l'écran, et on applique un translateY en fonction.

- Trouver la position du centre de l'élément par rapport au centre de l'écran
- Appliquer un translateY = ratio x (centre écran - centre élément)

## Signature

- new Parallax(element)
- data-parallax="0.2"
- data-parallax='{"y": 0.2, "rotate": 0.02}'
- Parallax.bind()
