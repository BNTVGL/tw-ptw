import { Twinkle, init, SiteConfig } from './core';
import messages from './messages.json';
import mwMessageList from './mw-messages';

// import modules
import { Fluff } from './fluff';

// no customisation; import directly from core
import { DiffCore as Diff } from './core';

import { Tag } from './tag';

import { Welcome } from './welcome';

import { Warn } from './warn';

// register some globals for debugging, as per twinkle v2
import './globals';

// Check if account is experienced enough to use Twinkle
if (!Morebits.userIsInGroup('autoconfirmed') && !Morebits.userIsInGroup('confirmed')) {
	throw new Error('Twinkle: forbidden!');
}

Twinkle.userAgent = `Twinkle (${mw.config.get('wgWikiID')})`;

Twinkle.summaryAd = ' ([[WP:TW|TW]])';

Twinkle.changeTags = '';

Twinkle.messageOverrides = messages;

Twinkle.extraMwMessages = mwMessageList;

// List of module classes enabled
Twinkle.registeredModules = [Fluff, Diff, Tag, Welcome, Warn];

/**
 * Adjust the following configurations if necessary
 * Check the documentation for each property here:
 * https://twinkle.toolforge.org/core-docs/modules/siteconfig.html
 */

SiteConfig.permalinkSpecialPageName = 'Special:PermanentLink';

SiteConfig.botUsernameRegex = /bot\b/i;

SiteConfig.flaggedRevsNamespaces = [];

SiteConfig.redirectTagAliases = ['#REDIRECIONAMENTO'];

// Go!
init();
