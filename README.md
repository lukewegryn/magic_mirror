# magic_mirror
magic mirror forked from mish mish
=======
![magicmirror²: the open source modular smart mirror platform. ](.github/header.png)

<p align="center">
	<a href="https://david-dm.org/michmich/magicmirror"><img src="https://david-dm.org/michmich/magicmirror.svg" alt="dependency status"></a>
	<a href="https://david-dm.org/michmich/magicmirror#info=devdependencies"><img src="https://david-dm.org/michmich/magicmirror/dev-status.svg" alt="devdependency status"></a>
	<a href="https://bestpractices.coreinfrastructure.org/projects/347"><img src="https://bestpractices.coreinfrastructure.org/projects/347/badge"></a>
	<a href="http://choosealicense.com/licenses/mit"><img src="https://img.shields.io/badge/license-mit-blue.svg" alt="license"></a>
	<a href="https://travis-ci.org/michmich/magicmirror"><img src="https://travis-ci.org/michmich/magicmirror.svg" alt="travis"></a>
	<a href="https://snyk.io/test/github/michmich/magicmirror"><img src="https://snyk.io/test/github/michmich/magicmirror/badge.svg" alt="known vulnerabilities" data-canonical-src="https://snyk.io/test/github/michmich/magicmirror" style="max-width:100%;"></a>
</p>

**magicmirror²** is an open source modular smart mirror platform. with a growing list of installable modules, the **magicmirror²** allows you to convert your hallway or bathroom mirror into your personal assistant. **magicmirror²** is built by the creator of [the original magicmirror](http://michaelteeuw.nl/tagged/magicmirror) with the incredible help of a [growing community of contributors](https://github.com/michmich/magicmirror/graphs/contributors).

magicmirror² focuses on a modular plugin system and uses [electron](http://electron.atom.io/) as an application wrapper. so no more web server or browser installs necessary!

## table of contents

- [usage](#usage)
- [configuration](#configuration)
- [modules](#modules)
- [known issues](#known-issues)
- [community](#community)
- [contributing guidelines](#contributing-guidelines)

## usage

### raspberry pi support
electron, the app wrapper around magicmirror², only supports the raspberry pi 2 & 3. the raspberry pi 1 is currently **not** supported. if you want to run this on a raspberry pi 1, use the [server only](#server-only) feature and setup a fullscreen browser yourself.

### automatic installer (raspberry pi only!)

execute the following command on your raspberry pi to install magicmirror²:
````
curl -sl https://raw.githubusercontent.com/michmich/magicmirror/master/installers/raspberry.sh | bash
````

### Manual Installation

1. Download and install the latest Node.js version.
2. Clone the repository and check out the beta branch: `git clone https://github.com/MichMich/MagicMirror`
3. Enter the repository: `cd ~/MagicMirror`
4. Install and run the app: `npm install && npm start`

**Important:** `npm start` does **not** work via SSH, use `DISPLAY=:0 nohup npm start &` instead. This starts the mirror on the remote display.

**Note:** if you want to debug on Raspberry Pi you can use `npm start dev` which will start the MagicMirror app with Dev Tools enabled.

### Server Only

In some cases, you want to start the application without an actual app window. In this case, execute the following command from the MagicMirror folder: `node serveronly`. This will start the server, after which you can open the application in your browser of choice.

### Raspberry Configuration & Auto Start.

The following wiki links are helpful in the configuration of your MagicMirror² operating system:
- [Configuring the Raspberry Pi](https://github.com/MichMich/MagicMirror/wiki/Configuring-the-Raspberry-Pi)
- [Auto Starting MagicMirror](https://github.com/MichMich/MagicMirror/wiki/Auto-Starting-MagicMirror)

### Updating your MagicMirror²

If you want to update your MagicMirror² to the latest version, use your terminal to go to your Magic Mirror folder and type the following command:

```bash
git pull && npm install
```

If you changed nothing more than the config or the modules, this should work without any problems.
Type `git status` to see your changes, if there are any, you can reset them with `git reset --hard`. After that, git pull should be possible.

## Configuration

1. Duplicate `config/config.js.sample` to `config/config.js`.
2. Modify your required settings.

The following properties can be configured:

| **Option** | **Description** |
| --- | --- |
| `port` | The port on which the MagicMirror² server will run on. The default value is `8080`. |
| `address` | The ip address the accept connections. The  default open bind `::` is IPv6 is available or `0.0.0.0` IPv4 run on.  Example config: `192.168.10.100`. |
| `ipWhitelist` | The list of IPs from which you are allowed to access the MagicMirror². The default value is `["127.0.0.1", "::ffff:127.0.0.1", "::1"]`. It is possible to specify IPs with subnet masks (`["127.0.0.1", "127.0.0.1/24"]`) or define ip ranges (`["127.0.0.1", ["192.168.0.1", "192.168.0.100"]]`).|
| `zoom` | This allows to scale the mirror contents with a given zoom factor. The default value is `1.0`|
| `language` | The language of the interface. (Note: Not all elements will be localized.) Possible values are `en`, `nl`, `ru`, `fr`, etc., but the default value is `en`. |
| `timeFormat` | The form of time notation that will be used. Possible values are `12` or `24`. The default is `24`. |
| `units` | The units that will be used in the default weather modules. Possible values are `metric` or `imperial`. The default is `metric`. |
| `modules` | An array of active modules. **The array must contain objects. See the next table below for more information.** |
| `electronOptions` | An optional array of Electron (browser) options. This allows configuration of e.g. the browser screen size and position (defaults `.width = 800` & `.height = 600`). Kiosk mode can be enabled by setting `.kiosk = true`, `.autoHideMenuBar = false`, `.fullscreen = false`. More options can be found [here](https://github.com/electron/electron/blob/master/docs/api/browser-window.md). |


Module configuration:

| **Option** | **Description** |
| --- | --- |
| `module` | The name of the module. This can also contain the subfolder. Valid examples include `clock`, `default/calendar` and `custommodules/mymodule`. |
| `position` | The location of the module in which the module will be loaded. Possible values are `top_ bar`, `top_left`, `top_center`, `top_right`, `upper_third`, `middle_center`, `lower_third`, `bottom_left`, `bottom_center`, `bottom_right`, `bottom_bar`, `fullscreen_above`, and `fullscreen_below`. This field is optional but most modules require this field to set. Check the documentation of the module for more information. Multiple modules with the same position will be ordered based on the order in the configuration file. |
| `classes` | Additional classes which are passed to the module. The field is optional. |
| `header` | To display a header text above the module, add the header property. This field is optional. |
| `disabled` | Set disabled to `true` to skip creating the module. This field is optional. |
| `config` | An object with the module configuration properties. Check the documentation of the module for more information. This field is optional, unless the module requires extra configuration. |

## Modules

The following modules are installed by default.

- [**Clock**](modules/default/clock)
- [**Calendar**](modules/default/calendar)
- [**Current Weather**](modules/default/currentweather)
- [**Weather Forecast**](modules/default/weatherforecast)
- [**News Feed**](modules/default/newsfeed)
- [**Compliments**](modules/default/compliments)
- [**Hello World**](modules/default/helloworld)
- [**Alert**](modules/default/alert)

For more available modules, check out out the wiki page: [MagicMirror² Modules](https://github.com/MichMich/MagicMirror/wiki/MagicMirror²-Modules). If you want to build your own modules, check out the [MagicMirror² Module Development Documentation](modules) and don't forget to add it to the wiki and the [forum](https://forum.magicmirror.builders/category/7/showcase)!

## Known issues

- Electron seems to have some issues on certain Raspberry Pi 2's. See [#145](https://github.com/MichMich/MagicMirror/issues/145).
- MagicMirror² (Electron) sometimes quits without an error after an extended period of use. See [#150](https://github.com/MichMich/MagicMirror/issues/150).

## Community

The community around the MagicMirror² is constantly growing. We even have a [forum](https://forum.magicmirror.builders) now where you can share your ideas, ask questions, help others and get inspired by other builders. We would love to see you there!

## Contributing Guidelines

Contributions of all kinds are welcome, not only in the form of code but also with regards bug reports and documentation.

Please keep the following in mind:

- **Bug Reports**:  Make sure you're running the latest version. If the issue(s) still persist: please open a clearly documented issue with a clear title.
- **Minor Bug Fixes**: Please send a pull request with a clear explanation of the issue or a link to the issue it solves.
- **Major Bug Fixes**: please discuss your approach in an GitHub issue before you start to alter a big part of the code.
- **New Features**: please please discuss in a GitHub issue before you start to alter a big part of the code. Without discussion upfront, the pull request will not be accepted / merged.

Thanks for your help in making MagicMirror² better!

<p align="center">
<br>
	<a href="https://forum.magicmirror.builders/topic/728/magicmirror-is-voted-number-1-in-the-magpi-top-50"><img src="https://magicmirror.builders/img/magpi-best-watermark-custom.png" width="150" alt="MagPi Top 50"></a>
</p>
