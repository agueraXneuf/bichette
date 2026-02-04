# Instructions de déploiement sur GitHub Pages

## 1. Créer le dépôt GitHub
- Allez sur https://github.com/new
- Nom du dépôt : `bichette`
- Ne cochez PAS "Initialize with README"

## 2. Connecter le dépôt local à GitHub
```bash
git remote add origin https://github.com/agueraXneuf/bichette.git
git branch -M master
git push -u origin master
```

## 3. Activer GitHub Pages
1. Allez dans votre dépôt sur GitHub
2. Settings → Pages
3. Sous "Source", sélectionnez "GitHub Actions"

## 4. Le site sera disponible à :
https://agueraXneuf.github.io/bichette/

## Note
Si vous changez le nom du dépôt, n'oubliez pas de mettre à jour le `base` dans `vite.config.js`
