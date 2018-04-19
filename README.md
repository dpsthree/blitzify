# Blitzify
### [Stackblitz](https://stackblitz.com) link generator for tutorial based projects

## Installation

```bash
npm install -g blitzify
```

## Usage

```bash
blitzify -h
```

## Repository setup

Blitzify was originally created to easily update a projects README.md file by inserting a collection of stackblitz links. By default Blitzify will attempt to locate the following text "----stackblitz list----" inside README.md. This marker is replaced by the generated list content. Please ensure that this marker is present before executing.

Blitzify works by reading tagged commits in a repository. Please make sure that the appropriate tags are in place before running Blitzify. By default Blitzify will look for tags with the following structure: ```Step-##_Description```. For example: ```Step-12_Lazy_loading_modules```

### Custom markers

If the repositories README.md file already contains a marker that should be used to indicate where the generated list should be placed, or "---stackblitz list---" is not a deseriable marker; it is possible to specify a custom marker using the -o command line argument.

```bash
blitzify -u namespace/repo -m customer-marker-text-goes-here
```

### Custom prefixes

If the repository already contains existing tags or "Step-" is not a desirable prefix; it is possible to specify a custom prefix using the -p command line argument.

```bash
blitzify -u namespace/repo -p custom-prefix-text-goes-here
```

## License

MIT

## Author
[Paul Spears](github.com/dpsthree) [@dpsthree](twitter.com/dpsthree)

[Oasis Digital Solutions](https://oasisdigtal.com)
<img src="https://angularbootcamp.com/images/od-logo.svg">

[Angular Boot Camp](https://angularbootcamp.com)
<img src="https://angularbootcamp.com/images/angular-boot-camp-logo.svg">