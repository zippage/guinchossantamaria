# Guinchos Santa Maria — Landing Page (Entrega Final)

## Sobre este projeto
Landing page desenvolvida pela ZipPage para a Guinchos Santa Maria. Projeto
**aprovado pelo cliente**, sem alterações de conteúdo ou visual solicitadas
na versão final. Este documento registra as fontes de cada informação usada
e as decisões tomadas, para consulta futura.

## Fontes de conteúdo
- Site anterior: https://www.guinchossantamaria.com.br/ (Wix)
- 10 fotos reais enviadas pelo cliente (guinchos/veículos)
- 6 sitelinks reais do Google Ads do cliente + 5 artes de divulgação (WhatsApp)
- Perfil da Empresa no Google (5,0 estrelas, 42 avaliações)
- Confirmação verbal direta do cliente sobre área de cobertura (ver abaixo)

## Decisões tomadas e por quê

- **Área de cobertura — Santa Maria + território nacional**: confirmado
  diretamente pelo cliente (não apenas inferido de material de divulgação).
  O cliente realiza viagens de reboque de longa distância sem limitação fixa
  de distância. Por isso o site, os metadados e o Schema.org declaram
  cobertura nacional (`areaServed` inclui `Country: Brasil`).

- **Endereço comercial**: existe um endereço confirmado via Perfil da Empresa
  no Google (fonte oficial), mas **o cliente pediu explicitamente para não
  exibi-lo publicamente no site**. Por isso o Schema.org usa `areaServed`
  (cidade + país) em vez de `PostalAddress`, e nenhum endereço aparece no
  conteúdo visível. Essa é uma decisão de preferência do cliente, não uma
  limitação por falta de confirmação.

- **Aceita cartão / emite nota fiscal**: confirmado nos sitelinks do Google
  Ads do cliente e no Perfil da Empresa no Google. Incluído no conteúdo, no
  FAQ e no Schema.org (`paymentAccepted`).

- **Schema.org FAQPage**: adicionado espelhando exatamente as perguntas e
  respostas visíveis na seção de FAQ da página (nenhum conteúdo adicional
  foi criado só para o schema).

- **Nenhum depoimento, avaliação, prêmio ou certificação foi inventado.**
  O Perfil da Empresa no Google já traz prova social real (5,0/42
  avaliações) — se o cliente autorizar, uma próxima versão pode exibir esse
  dado e/ou avaliações reais na própria página.

## Checklist antes de publicar

1. **[BLOQUEIA PUBLICAÇÃO] Substituir `GTM-XXXXXXX` pelo ID real do
   container do Google Tag Manager** em `index.html` (aparece 2x: `<head>` e
   logo após `<body>`). Sem isso, os eventos de `whatsapp_click`,
   `phone_click`, `scroll_depth` e `faq_open` (já implementados em
   `js/main.js`) não são capturados por nenhuma ferramenta de análise.
2. Confirmar o domínio de produção final e validar que `canonical`, Open
   Graph e `sitemap.xml` apontam todos para `https://www.guinchossantamaria.com.br/`.
3. Após publicar, submeter `sitemap.xml` no Google Search Console e
   confirmar que o Perfil da Empresa no Google aponta para o novo site.
4. Revisar os 6 sitelinks do Google Ads: hoje todos apontam para a raiz do
   domínio. Recomenda-se atualizar cada um para a âncora correspondente da
   nova página (`#atendimento`, `#contato`, `#servicos`) para melhorar o
   Índice de Qualidade e a experiência de quem clica no anúncio.

## Estrutura de arquivos
```
index.html
privacidade.html  → política de privacidade (LGPD), link corrigido no rodapé
css/
  reset.css
  variables.css   → tokens de design (cor, tipografia, espaçamento)
  style.css       → estilos mobile-first
  responsive.css  → breakpoints tablet (700px) e desktop (1024px)
js/
  main.js         → scroll reveal, tracking GTM, FAQ accordion
assets/img/       → fotos reais otimizadas em WebP (full + thumb)
robots.txt
sitemap.xml       → inclui index.html e privacidade.html
```

## Como visualizar
Abra `index.html` em qualquer navegador, ou rode um servidor local:
```
python3 -m http.server 8080
```
