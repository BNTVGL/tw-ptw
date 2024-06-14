import { Twinkle, Page, Config, Preference, PreferenceGroup, getPref } from './core';
import { TagCore, tagData, tagListType, TagMode, tagSubgroup } from './core';
import { hatnoteRegex } from './common';

const redirectTagList: tagListType = {
	'Grammar, punctuation, and spelling': {
		'Abbreviation': [
			{
				tag: 'R from acronym',
				description: 'redirect from an acronym (e.g. POTUS) to its expanded form',
			},
			{
				tag: 'R from initialism',
				description: 'redirect from an initialism (e.g. AGF) to its expanded form',
			},
			{
				tag: 'R from MathSciNet abbreviation',
				description:
					'redirect from MathSciNet publication title abbreviation to the unabbreviated title',
			},
			{
				tag: 'R from NLM abbreviation',
				description:
					'redirect from a NLM publication title abbreviation to the unabbreviated title',
			},
		],
		'Capitalisation': [
			{ tag: 'R from CamelCase', description: 'redirect from a CamelCase title' },
			{
				tag: 'R from other capitalisation',
				description: 'redirect from a title with another method of capitalisation',
			},
			{ tag: 'R from miscapitalisation', description: 'redirect from a capitalisation error' },
		],
		'Grammar & punctuation': [
			{
				tag: 'R from modification',
				description:
					"redirect from a modification of the target's title, such as with words rearranged",
			},
			{
				tag: 'R from plural',
				description: 'redirect from a plural word to the singular equivalent',
			},
			{ tag: 'R to plural', description: 'redirect from a singular noun to its plural form' },
		],
		'Parts of speech': [
			{ tag: 'R from verb', description: 'redirect from an English-language verb or verb phrase' },
			{
				tag: 'R from adjective',
				description: 'redirect from an adjective (word or phrase that describes a noun)',
			},
		],
		'Spelling': [
			{
				tag: 'R from alternative spelling',
				description: 'redirect from a title with a different spelling',
			},
			{
				tag: 'R from ASCII-only',
				description:
					'redirect from a title in only basic ASCII to the formal title, with differences that are not diacritical marks or ligatures',
			},
			{
				tag: 'R from diacritic',
				description:
					'redirect from a page name that has diacritical marks (accents, umlauts, etc.)',
			},
			{
				tag: 'R to diacritic',
				description:
					'redirect to the article title with diacritical marks (accents, umlauts, etc.)',
			},
			{
				tag: 'R from misspelling',
				description: 'redirect from a misspelling or typographical error',
			},
		],
	},
	'Alternative names': {
		General: [
			{
				tag: 'R from alternative language',
				description: 'redirect from or to a title in another language',
				subgroup: [
					{
						name: 'altLangFrom',
						type: 'input',
						label: 'From language (two-letter code): ',
						tooltip:
							'Enter the two-letter code of the language the redirect name is in; such as en for English, de for German',
						parameter: 'from',
					},
					{
						name: 'altLangTo',
						type: 'input',
						label: 'To language (two-letter code): ',
						tooltip:
							'Enter the two-letter code of the language the target name is in; such as en for English, de for German',
						parameter: 'to',
					},
					{
						name: 'altLangInfo',
						type: 'div',
						label:
							'For a list of language codes, see [[Wikipedia:Template messages/Redirect language codes]]',
					},
				],
			},
			{
				tag: 'R from alternative name',
				description:
					'redirect from a title that is another name, a pseudonym, a nickname, or a synonym',
			},
			{
				tag: 'R from ambiguous sort name',
				description: 'redirect from an ambiguous sort name to a page or list that disambiguates it',
			},
			{ tag: 'R from former name', description: 'redirect from a former name or working title' },
			{
				tag: 'R from historic name',
				description:
					'redirect from a name with a significant historic past as a region, city, etc. no longer known by that name',
			},
			{ tag: 'R from incomplete name', description: 'R from incomplete name' },
			{
				tag: 'R from incorrect name',
				description: 'redirect from an erroneus name that is unsuitable as a title',
			},
			{
				tag: 'R from less specific name',
				description: 'redirect from a less specific title to a more specific, less general one',
			},
			{ tag: 'R from long name', description: 'redirect from a more complete title' },
			{
				tag: 'R from more specific name',
				description: 'redirect from a more specific title to a less specific, more general one',
			},
			{
				tag: 'R from short name',
				description:
					"redirect from a title that is a shortened form of a person's full name, a book title, or other more complete title",
			},
			{
				tag: 'R from sort name',
				description:
					"redirect from the target's sort name, such as beginning with their surname rather than given name",
			},
			{
				tag: 'R from synonym',
				description: 'redirect from a semantic synonym of the target page title',
			},
		],
		People: [
			{
				tag: 'R from birth name',
				description: "redirect from a person's birth name to a more common name",
			},
			{ tag: 'R from given name', description: "redirect from a person's given name" },
			{
				tag: 'R from name with title',
				description:
					"redirect from a person's name preceded or followed by a title to the name with no title or with the title in parentheses",
			},
			{
				tag: 'R from person',
				description: 'redirect from a person or persons to a related article',
			},
			{
				tag: 'R from personal name',
				description:
					"redirect from an individual's personal name to an article titled with their professional or other better known moniker",
			},
			{ tag: 'R from pseudonym', description: 'redirect from a pseudonym' },
			{ tag: 'R from surname', description: 'redirect from a title that is a surname' },
		],
		Technical: [
			{
				tag: 'R from drug trade name',
				description:
					'redirect from (or to) the trade name of a drug to (or from) the international nonproprietary name (INN)',
			},
			{
				tag: 'R from filename',
				description: 'redirect from a title that is a filename of the target',
			},
			{
				tag: 'R from molecular formula',
				description: 'redirect from a molecular/chemical formula to its technical or trivial name',
			},

			{
				tag: 'R from gene symbol',
				description:
					'redirect from a Human Genome Organisation (HUGO) symbol for a gene to an article about the gene',
			},
		],
		Organisms: [
			{
				tag: 'R to scientific name',
				description: 'redirect from the common name to the scientific name',
			},
			{
				tag: 'R from scientific name',
				description: 'redirect from the scientific name to the common name',
			},
			{
				tag: 'R from alternative scientific name',
				description: 'redirect from an alternative scientific name to the accepted scientific name',
			},
			{
				tag: 'R from scientific abbreviation',
				description: 'redirect from a scientific abbreviation',
			},
			{
				tag: 'R to monotypic taxon',
				description:
					'redirect from the only lower-ranking member of a monotypic taxon to its monotypic taxon',
			},
			{
				tag: 'R from monotypic taxon',
				description: 'redirect from a monotypic taxon to its only lower-ranking member',
			},
			{
				tag: 'R taxon with possibilities',
				description:
					'redirect from a title related to a living organism that potentially could be expanded into an article',
			},
		],
		Geography: [
			{
				tag: 'R from name and country',
				description: 'redirect from the specific name to the briefer name',
			},
			{
				tag: 'R from more specific geographic name',
				description:
					'redirect from a geographic location that includes extraneous identifiers such as the county or region of a city',
			},
		],
	},
	'Navigation aids': {
		'Navigation': [
			{
				tag: 'R to anchor',
				description:
					'redirect from a topic that does not have its own page to an anchored part of a page on the subject',
			},
			{
				tag: 'R avoided double redirect',
				description: 'redirect from an alternative title for another redirect',
				subgroup: {
					name: 'doubleRedirectTarget',
					type: 'input',
					label: 'Redirect target name',
					tooltip: "Enter the page this redirect would target if the page wasn't also a redirect",
					parameter: '1',
				},
			},
			{
				tag: 'R from file metadata link',
				description:
					'redirect of a wikilink created from EXIF, XMP, or other information (i.e. the "metadata" section on some image description pages)',
			},
			{
				tag: 'R to list entry',
				description:
					'redirect to a list which contains brief descriptions of subjects not notable enough to have separate articles',
			},

			{
				tag: 'R mentioned in hatnote',
				description: 'redirect from a title that is mentioned in a hatnote at the redirect target',
			},
			{
				tag: 'R to section',
				description:
					'similar to {{R to list entry}}, but when list is organized in sections, such as list of characters in a fictional universe',
			},
			{ tag: 'R from shortcut', description: 'redirect from a Wikipedia shortcut' },
			{
				tag: 'R from template shortcut',
				description:
					'redirect from a shortcut page name in any namespace to a page in template namespace',
			},
		],
		'Disambiguation': [
			{
				tag: 'R from ambiguous term',
				description:
					'redirect from an ambiguous page name to a page that disambiguates it. This template should never appear on a page that has "(disambiguation)" in its title, use R to disambiguation page instead',
			},
			{ tag: 'R to disambiguation page', description: 'redirect to a disambiguation page' },
			{
				tag: 'R from incomplete disambiguation',
				description:
					'redirect from a page name that is too ambiguous to be the title of an article and should redirect to an appropriate disambiguation page',
			},
			{
				tag: 'R from incorrect disambiguation',
				description:
					'redirect from a page name with incorrect disambiguation due to an error or previous editorial misconception',
			},
			{
				tag: 'R from other disambiguation',
				description: 'redirect from a page name with an alternative disambiguation qualifier',
			},
			{
				tag: 'R from unnecessary disambiguation',
				description: 'redirect from a page name that has an unneeded disambiguation qualifier',
			},
		],
		'Merge, duplicate & move': [
			{
				tag: 'R from duplicated article',
				description: 'redirect to a similar article in order to preserve its edit history',
			},
			{
				tag: 'R with history',
				description:
					'redirect from a page containing substantive page history, kept to preserve content and attributions',
			},
			{ tag: 'R from move', description: 'redirect from a page that has been moved/renamed' },
			{
				tag: 'R from merge',
				description: 'redirect from a merged page in order to preserve its edit history',
			},
		],
		'Namespace': [
			{
				tag: 'R from remote talk page',
				description:
					'redirect from a talk page in any talk namespace to a corresponding page that is more heavily watched',
			},
			{
				tag: 'R to category namespace',
				description: 'redirect from a page outside the category namespace to a category page',
			},
			{
				tag: 'R to help namespace',
				description:
					'redirect from any page inside or outside of help namespace to a page in that namespace',
			},
			{
				tag: 'R to main namespace',
				description:
					'redirect from a page outside the main-article namespace to an article in mainspace',
			},
			{
				tag: 'R to portal namespace',
				description:
					'redirect from any page inside or outside of portal space to a page in that namespace',
			},
			{
				tag: 'R to project namespace',
				description:
					'redirect from any page inside or outside of project (Wikipedia: or WP:) space to any page in the project namespace',
			},
			{
				tag: 'R to user namespace',
				description:
					'redirect from a page outside the user namespace to a user page (not to a user talk page)',
			},
		],
	},
	'Media': {
		General: [
			{
				tag: 'R from book',
				description: 'redirect from a book title to a more general, relevant article',
			},
			{
				tag: 'R from album',
				description:
					'redirect from an album to a related topic such as the recording artist or a list of albums',
			},
			{
				tag: 'R from song',
				description: 'redirect from a song title to a more general, relevant article',
			},
			{
				tag: 'R from television episode',
				description:
					'redirect from a television episode title to a related work or lists of episodes',
			},
		],
		Fiction: [
			{
				tag: 'R from fictional character',
				description:
					'redirect from a fictional character to a related fictional work or list of characters',
			},
			{
				tag: 'R from fictional element',
				description:
					'redirect from a fictional element (such as an object or concept) to a related fictional work or list of similar elements',
			},
			{
				tag: 'R from fictional location',
				description:
					'redirect from a fictional location or setting to a related fictional work or list of places',
			},
		],
	},
	'Miscellaneous': {
		'Related information': [
			{
				tag: 'R to article without mention',
				description: 'redirect to an article without any mention of the redirected word or phrase',
			},
			{ tag: 'R to decade', description: 'redirect from a year to the decade article' },
			{
				tag: 'R from domain name',
				description: 'redirect from a domain name to an article about a website',
			},
			{
				tag: 'R from phrase',
				description: 'redirect from a phrase to a more general relevant article covering the topic',
			},
			{
				tag: 'R from list topic',
				description: 'redirect from the topic of a list to the equivalent list',
			},
			{
				tag: 'R from member',
				description:
					'redirect from a member of a group to a related topic such as the group or organization',
			},
			{ tag: 'R to related topic', description: 'redirect to an article about a similar topic' },
			{ tag: 'R from related word', description: 'redirect from a related word' },
			{
				tag: 'R from school',
				description: 'redirect from a school article that had very little information',
			},
			{
				tag: 'R from subtopic',
				description: 'redirect from a title that is a subtopic of the target article',
			},
			{ tag: 'R to subtopic', description: "redirect to a subtopic of the redirect's title" },
			{
				tag: 'R from Unicode character',
				description:
					'redirect from a single Unicode character to an article or Wikipedia project page that infers meaning for the symbol',
			},
			{
				tag: 'R from Unicode code',
				description:
					'redirect from a Unicode code point to an article about the character it represents',
			},
		],
		'With possibilities': [
			{
				tag: 'R with possibilities',
				description:
					'redirect from a specific title to a more general, less detailed article (something which can and should be expanded)',
			},
		],
		'ISO codes': [
			{
				tag: 'R from ISO 4 abbreviation',
				description:
					'redirect from an ISO 4 publication title abbreviation to the unabbreviated title',
			},
			{
				tag: 'R from ISO 639 code',
				description:
					'redirect from a title that is an ISO 639 language code to an article about the language',
			},
		],
		'Printworthiness': [
			{
				tag: 'R printworthy',
				description:
					'redirect from a title that would be helpful in a printed or CD/DVD version of Wikipedia',
			},
			{
				tag: 'R unprintworthy',
				description:
					'redirect from a title that would NOT be helpful in a printed or CD/DVD version of Wikipedia',
			},
		],
	},
};

const fileTagList: tagListType = {
	'License and sourcing problem tags': [
		{
			tag: 'Better source requested',
			description: 'source info consists of bare image URL/generic base URL only',
		},
		{
			tag: 'Non-free reduce',
			description: 'non-low-resolution fair use image (or too-long audio clip, etc)',
		},
		{
			tag: 'Orphaned non-free revisions',
			description: 'fair use media with old revisions that need to be deleted',
			subst: true,
			subgroup: {
				type: 'hidden',
				name: 'OrphanedNonFreeRevisionsDate',
				parameter: 'date',
				value: '{{subst:date}}',
			},
		},
	],
	'Wikimedia Commons-related tags': [
		{
			tag: 'Copy to Commons',
			description: 'free media that should be copied to Commons',
			subgroup: {
				type: 'hidden',
				name: 'CopyToCommonsHuman',
				parameter: 'human',
				value: mw.config.get('wgUserName'),
			},
		},
		{
			tag: 'Do not move to Commons',
			description: 'file not suitable for moving to Commons',
			subgroup: [
				{
					type: 'input',
					name: 'DoNotMoveToCommons_reason',
					label: 'Reason: ',
					tooltip:
						'Enter the reason why this image should not be moved to Commons (required). If the file is PD in the US but not in country of origin, enter "US only"',
					required: true,
					parameter: 'reason',
				},
				{
					type: 'input',
					name: 'DoNotMoveToCommons_expiry',
					label: 'Expiration year: ',
					tooltip:
						'If this file can be moved to Commons beginning in a certain year, you can enter it here (optional).',
					parameter: 'expiry',
				},
			],
		},
		{
			tag: 'Keep local',
			description: 'request to keep local copy of a Commons file',
			subgroup: {
				type: 'input',
				name: 'keeplocalName',
				label: 'Commons image name if different: ',
				tooltip:
					'Name of the image on Commons (if different from local name), excluding the File: prefix:',
				parameter: '1',
			},
		},
		{
			tag: 'Now Commons',
			description: 'file has been copied to Commons',
			subst: true,
			subgroup: {
				type: 'input',
				name: 'nowcommonsName',
				label: 'Commons image name if different: ',
				tooltip:
					'Name of the image on Commons (if different from local name), excluding the File: prefix:',
				parameter: '1',
			},
		},
	],
	'Cleanup tags': [
		{ tag: 'Artifacts', description: 'PNG contains residual compression artifacts' },
		{ tag: 'Bad font', description: 'SVG uses fonts not available on the thumbnail server' },
		{
			tag: 'Bad format',
			description: 'PDF/DOC/... file should be converted to a more useful format',
		},
		{ tag: 'Bad GIF', description: 'GIF that should be PNG, JPEG, or SVG' },
		{ tag: 'Bad JPEG', description: 'JPEG that should be PNG or SVG' },
		{ tag: 'Bad SVG', description: 'SVG containing raster grahpics' },
		{ tag: 'Bad trace', description: 'auto-traced SVG requiring cleanup' },
		{
			tag: 'Cleanup image',
			description: 'general cleanup',
			subgroup: {
				type: 'input',
				name: 'cleanupimageReason',
				label: 'Reason: ',
				tooltip: 'Enter the reason for cleanup (required)',
				required: true,
				parameter: '1',
			},
		},
		{ tag: 'ClearType', description: 'image (not screenshot) with ClearType anti-aliasing' },
		{ tag: 'Imagewatermark', description: 'image contains visible or invisible watermarking' },
		{ tag: 'NoCoins', description: 'image using coins to indicate scale' },
		{ tag: 'Overcompressed JPEG', description: 'JPEG with high levels of artifacts' },
		{ tag: 'Opaque', description: 'opaque background should be transparent' },
		{ tag: 'Remove border', description: 'unneeded border, white space, etc.' },
		{
			tag: 'Rename media',
			description: 'file should be renamed according to the criteria at [[WP:FMV]]',
			subgroup: [
				{
					type: 'input',
					name: 'renamemediaNewname',
					label: 'New name: ',
					tooltip: 'Enter the new name for the image (optional)',
					parameter: '1',
				},
				{
					type: 'input',
					name: 'renamemediaReason',
					label: 'Reason: ',
					tooltip: 'Enter the reason for the rename (optional)',
					parameter: '2',
				},
			],
		},
		{ tag: 'Should be PNG', description: 'GIF or JPEG should be lossless' },
		{
			tag: 'Should be SVG',
			description: 'PNG, GIF or JPEG should be vector graphics',
			subgroup: {
				name: 'svgCategory',
				type: 'select',
				list: [
					{ label: '{{Should be SVG|other}}', value: 'other' },
					{
						label: '{{Should be SVG|alphabet}}: character images, font examples, etc.',
						value: 'alphabet',
					},
					{ label: '{{Should be SVG|chemical}}: chemical diagrams, etc.', value: 'chemical' },
					{
						label: '{{Should be SVG|circuit}}: electronic circuit diagrams, etc.',
						value: 'circuit',
					},
					{ label: '{{Should be SVG|coat of arms}}: coats of arms', value: 'coat of arms' },
					{
						label: '{{Should be SVG|diagram}}: diagrams that do not fit any other subcategory',
						value: 'diagram',
					},
					{
						label: '{{Should be SVG|emblem}}: emblems, free/libre logos, insignias, etc.',
						value: 'emblem',
					},
					{
						label: '{{Should be SVG|fair use}}: fair-use images, fair-use logos',
						value: 'fair use',
					},
					{ label: '{{Should be SVG|flag}}: flags', value: 'flag' },
					{ label: '{{Should be SVG|graph}}: visual plots of data', value: 'graph' },
					{ label: '{{Should be SVG|logo}}: logos', value: 'logo' },
					{ label: '{{Should be SVG|map}}: maps', value: 'map' },
					{ label: '{{Should be SVG|music}}: musical scales, notes, etc.', value: 'music' },
					{
						label:
							'{{Should be SVG|physical}}: "realistic" images of physical objects, people, etc.',
						value: 'physical',
					},
					{
						label: '{{Should be SVG|symbol}}: miscellaneous symbols, icons, etc.',
						value: 'symbol',
					},
				],
				parameter: '1',
			},
		},
		{
			tag: 'Should be text',
			description: 'image should be represented as text, tables, or math markup',
		},
	],
	'Image quality tags': [
		{
			tag: 'Image hoax',
			description: 'Image may be manipulated or constitute a hoax',
			subgroup: {
				type: 'hidden',
				name: 'ImageHoaxDate',
				parameter: 'date',
				value: '{{subst:CURRENTMONTHNAME}} {{subst:CURRENTYEAR}}',
			},
		},
		{ tag: 'Image-blownout' },
		{ tag: 'Image-out-of-focus' },
		{
			tag: 'Image-Poor-Quality',
			subgroup: {
				type: 'input',
				name: 'ImagePoorQualityReason',
				label: 'Reason: ',
				tooltip: 'Enter the reason why this image is so bad (required)',
				required: true,
				parameter: '1',
			},
		},
		{ tag: 'Image-underexposure' },
		{
			tag: 'Low quality chem',
			description: 'disputed chemical structures',
			subgroup: {
				type: 'input',
				name: 'lowQualityChemReason',
				label: 'Reason: ',
				tooltip: 'Enter the reason why the diagram is disputed (required)',
				required: true,
				parameter: '1',
			},
		},
	],
	'Replacement tags': [
		{ tag: 'Obsolete', description: 'improved version available' },
		{ tag: 'PNG version available' },
		{ tag: 'Vector version available' },
	],
};

(fileTagList['Replacement tags'] as Array<tagData>).forEach(function (el) {
	el.subgroup = {
		type: 'input',
		label: 'Replacement file: ',
		tooltip: 'Enter the name of the file which replaces this one (required)',
		name: el.tag.replace(/ /g, '_') + 'File',
		required: true,
		parameter: '1',
	};
});

// Shared across {{Rough translation}} and {{Not English}}
const translationSubgroups: tagSubgroup[] = ([
	{
		name: 'translationLanguage',
		parameter: '1',
		type: 'input',
		label: 'Language of article (if known): ',
		tooltip:
			'Consider looking at [[WP:LRC]] for help. If listing the article at PNT, please try to avoid leaving this box blank, unless you are completely unsure.',
	},
] as tagSubgroup[]).concat(
	mw.config.get('wgNamespaceNumber') === 0
		? [
				{
					type: 'checkbox',
					list: [
						{
							name: 'translationPostAtPNT',
							label: 'List this article at Wikipedia:Pages needing translation into English (PNT)',
							checked: true,
						},
					],
				},
				{
					name: 'translationComments',
					type: 'textarea',
					label: 'Additional comments to post at PNT',
					tooltip: 'Optional, and only relevant if "List this article ..." above is checked.',
				},
		  ]
		: []
);

// Subgroups for {{merge}}, {{merge-to}} and {{merge-from}}
function getMergeSubgroups(tag: string): tagSubgroup[] {
	var otherTagName = 'Merge';
	switch (tag) {
		case 'Merge from':
			otherTagName = 'Merge to';
			break;
		case 'Merge to':
			otherTagName = 'Merge from';
			break;
		// no default
	}
	return ([
		{
			name: 'mergeTarget',
			parameter: '1',
			type: 'input',
			label: 'Other article(s): ',
			tooltip:
				'If specifying multiple articles, separate them with pipe characters: Article one|Article two',
			required: true,
		},
		{
			type: 'checkbox',
			list: [
				{
					name: 'mergeTagOther',
					label: 'Tag the other article with a {{' + otherTagName + '}} tag',
					checked: true,
					tooltip: 'Only available if a single article name is entered.',
				},
			],
		},
	] as tagSubgroup[]).concat(
		mw.config.get('wgNamespaceNumber') === 0
			? {
					name: 'mergeReason',
					type: 'textarea',
					label:
						'Rationale for merge (will be posted on ' +
						(tag === 'Merge to' ? "the other article's" : "this article's") +
						' talk page):',
					tooltip:
						'Optional, but strongly recommended. Leave blank if not wanted. Only available if a single article name is entered.',
			  }
			: []
	);
}

const articleTagList: tagListType = {
	'Marcas de manutenção': {
		'Fontes': [
			{
				tag: 'Sem fontes',
				description: 'artigo não tem fontes',
			},
			{
				tag: 'Sem fontes-bpv',
				description: 'artigo de biografia de pessoa viva não tem fontes',
			},
			{
				tag: 'Sem notas',
				description:
					'artigo contém uma lista de fontes no rodapé que não estão citadas no corpo do texto',
			},
			{
				tag: 'Sem notas-bpv',
				description:
					'artigo de biografia de pessoa viva contém uma lista de fontes no rodapé que não estão citadas no corpo do texto',
			},
			{
				tag: 'Mais notas',
				description: 'artigo tem fontes, mas não cobrem todo o conteúdo',
			},
			{
				tag: 'Mais fontes-bpv',
				description:
					'artigo de biografia de pessoa viva tem fontes, mas não cobrem todo o conteúdo',
			},
			{
				tag: 'Fontes primárias',
				description: 'artigo carece de fontes secundárias',
			},
			{
				tag: 'Uma-fonte',
				description: 'artigo contém apenas uma fonte',
			},
		],
		'Referências': [
			{
				tag: 'Formatar referências',
				description: 'referências do artigo carecem de formatação',
			},
		],
		'Estrutura e Formatação': [
			{
				tag: 'Wikificação',
				description: 'artigo necessita de formatação conforme os padrões da Wikipédia',
			},
			{
				tag: 'Reciclagem',
				description: 'artigo precisa ser reescrito ou reorganizado',
			},
			{
				tag: 'Má tradução',
				description: 'artigo é uma tradução de baixa qualidade e necessita revisão',
			},
			{
				tag: 'Corrigir',
				description: 'artigo contém erros que precisam ser corrigidos',
			},
			{
				tag: 'Revisão',
				description: 'artigo precisa ser revisado para correção de erros ou melhoria do conteúdo',
			},
			{
				tag: 'Má introdução',
				description: 'artigo tem uma introdução inadequada ou insuficiente',
			},
		],
		'Categorização': [
			{
				tag: 'Sem cat',
				description: 'artigo não possui categorias',
			},
			{
				tag: 'Cat def',
				description: 'artigo tem uma categorização deficiente',
			},
		],
		'Infocaixas e Sinopses': [
			{
				tag: 'Sem infocaixa',
				description: 'artigo não possui infocaixa e necessita de uma',
				subgroup: {
					name: 'semInfocaixa',
					parameter: '2',
					type: 'input',
					label:
						'Existe alguma sugestão de infocaixa a ser usada?<br />Obs: não colocar <b>Predefinição:Info/NOME</b>, e sim somente <b>NOME</b>.',
					size: 35,
					required: false,
				},
			},
			{
				tag: 'Sem sinopse',
				description: 'artigo não possui sinopse',
			},
			{
				tag: 'Sinopse',
				description: 'artigo precisa de uma sinopse',
			},
		],
		'Imparcialidade e Qualidade': [
			{
				tag: 'Parcial',
				description: 'artigo apresenta um ponto de vista parcial',
			},
			{
				tag: 'Publicidade',
				description: 'artigo tem tom publicitário ou promocional',
			},
			{
				tag: 'Contextualizar',
				description: 'artigo carece de contexto ou explicação',
			},
			{
				tag: 'Não enciclopédico',
				description: 'artigo não está escrito em estilo enciclopédico',
			},
			{
				tag: 'Global',
				description: 'artigo possui uma perspectiva local e precisa de uma visão mais global',
			},
		],
		'Manutenção e Atualização': [
			{
				tag: 'Em manutenção',
				description: 'artigo está em manutenção emergencial',
			},
			{
				tag: 'Em construção',
				description: 'artigo está em construção',
			},
			{
				tag: 'Em tradução',
				description: 'artigo está em processo de tradução',
			},
			{
				tag: 'Desatualizado',
				description: 'artigo está desatualizado',
			},
			{
				tag: 'ev-atual',
				description: 'artigo trata de um evento atual e pode mudar rapidamente',
				subgroup: {
					name: 'eventoAtual',
					parameter: 'tema',
					type: 'select',
					list: [
						{ label: 'atentado', value: 'atentado' },
						{ label: 'atentado terrorista', value: 'atentado terrorista' },
						{ label: 'cheia', value: 'cheia' },
						{ label: 'ciberataque', value: 'ciberataque' },
						{ label: 'ciclone', value: 'ciclone' },
						{ label: 'clima', value: 'clima' },
						{ label: 'construção', value: 'construção' },
						{ label: 'desastre', value: 'desastre' },
						{ label: 'desporto', value: 'desporto' },
						{ label: 'eleição', value: 'eleição' },
						{ label: 'enchente', value: 'enchente' },
						{ label: 'epidemia', value: 'epidemia' },
						{ label: 'erupção', value: 'erupção' },
						{ label: 'esporte', value: 'esporte' },
						{ label: 'furacão', value: 'furacão' },
						{ label: 'guerra', value: 'guerra' },
						{ label: 'homicídio', value: 'homicídio' },
						{ label: 'incêndio', value: 'incêndio' },
						{ label: 'inundação', value: 'inundação' },
						{ label: 'manifestação', value: 'manifestação' },
						{ label: 'migração', value: 'migração' },
						{ label: 'missão espacial', value: 'missão espacial' },
						{ label: 'missão espacial humana', value: 'missão espacial humana' },
						{ label: 'morte', value: 'morte' },
						{ label: 'pandemia', value: 'pandemia' },
						{ label: 'pessoa', value: 'pessoa' },
						{ label: 'política', value: 'política' },
						{ label: 'processo judicial', value: 'processo judicial' },
						{ label: 'protesto', value: 'protesto' },
						{ label: 'reality show', value: 'reality show' },
						{ label: 'serie de televisão', value: 'serie de televisão' },
						{ label: 'sismo', value: 'sismo' },
						{ label: 'série', value: 'série' },
						{ label: 'telenovela', value: 'telenovela' },
						{ label: 'tempestade', value: 'tempestade' },
					],
				},
			},
			{
				tag: 'Evento futuro',
				description: 'artigo trata de um evento futuro',
				subgroup: {
					name: 'tema',
					parameter: 'tema',
					type: 'select',
					list: [
						{ label: 'aeronave', value: 'aeronave' },
						{ label: 'álbum', value: 'álbum' },
						{ label: 'animangá', value: 'animangá' },
						{ label: 'construção', value: 'construção' },
						{ label: 'cinema', value: 'cinema' },
						{ label: 'desporto', value: 'desporto' },
						{ label: 'eleição', value: 'eleição' },
						{ label: 'estação ferroviária', value: 'estação ferroviária' },
						{ label: 'missão espacial', value: 'missão espacial' },
						{ label: 'jogo', value: 'jogo' },
						{ label: 'livro', value: 'livro' },
						{ label: 'moda', value: 'moda' },
						{ label: 'música', value: 'música' },
						{ label: 'produto', value: 'produto' },
						{ label: 'programa de televisão', value: 'programa de televisão' },
						{ label: 'satélite', value: 'satélite' },
						{ label: 'série', value: 'série' },
						{ label: 'software', value: 'software' },
						{ label: 'televisão', value: 'televisão' },
					],
				},
			},
		],
		'Fusão e Renomeação': [
			{
				tag: 'Fusão',
				description: 'sugere a fusão deste artigo com outro',
				subgroup: [
					{
						name: 'fusãoorig',
						type: 'input',
						value: mw.config.get('wgTitle'),
						label: 'Página que permanecerá',
					},
					{
						name: 'fusãodestino',
						parameter: '2',
						type: 'input',
						label: 'Página que será fundida com a de cima',
					},
				],
			},
			{
				tag: 'Renomear página',
				description: 'sugere a renomeação desta página',
				subgroup: [
					{
						name: 'renomearpagina',
						parameter: '1',
						type: 'input',
						label: 'Novo título proposto para a página',
						required: true,
						tooltip: 'Obrigatório.',
					},
					{
						name: 'razãorenomear',
						parameter: '2',
						type: 'input',
						label: 'Motivo',
						required: false,
						tooltip: 'Opcional',
					},
				],
			},
		],
	},
};

class RedirectMode extends TagMode {
	name = 'redirect';
	tagList = redirectTagList;

	removalSupported = true;

	static isActive() {
		return Morebits.isPageRedirect();
	}

	getMenuTooltip() {
		return 'Tag redirect';
	}

	getWindowTitle() {
		return 'Redirect tagging';
	}

	makeForm(Window) {
		super.makeForm(Window);
		this.formAppendPatrolLink();
	}

	groupTemplateName = 'Redirect category shell';

	// Accounts for almost all the redirects of [[Template:Redirect category shell]].
	// {{This is a redirect}} is skipped as it has just 170 transclusions.
	groupTemplateNameRegex = '(?:R(?:edirect)?(?: ?cat)?(?:egory)? ?shell|Redr)';
	groupTemplateNameRegexFlags = 'i';

	// Used in finalCleanup()
	groupMinSize = 1;

	// Ends up being unused since, we are defining our own addAndRearrangeTags(), but still
	// worth defining for clarity, I guess
	assumeUnknownTagsGroupable = true;

	parseExistingTags() {
		this.existingTags = [];
		if (!this.canRemove()) {
			return;
		}
		$('.rcat').each((idx, rcat) => {
			let title = rcat.className.slice('rcat rcat-'.length).replace(/_/g, ' ');
			this.existingTags.push(title);
		});
	}

	sortTags() {
		let params = this.params;
		params.newTags = params.tags.filter((tag) => {
			let exists = this.getTagRegex(tag).test(this.pageText);
			if (exists && (!this.flatObject[tag] || !this.flatObject[tag].dupeAllowed)) {
				Morebits.status.warn('Info', `Found {{${tag}}} on the ${this.name} already... excluding`);
				return false; // remove from params.newTags
			}
			return true;
		});

		// Everything is groupable, setting params.groupableNewTags, params.nonGroupableNewTags, etc
		// isn't needed since we are anyway defining our own addAndRearrangeTags() below
	}

	/**
	 * An override is used here: since all Rcat templates begin with "R " or "Redirect ", we can
	 * identify them all from the wikitext and rearrange them if necessary. The super addAndRearrangeTags()
	 * uses params.tagsToRetain which is populated from the checked items of the "Tags already present"
	 * section of the dialog. Using that is unnecessary and limiting as it can make API calls and even
	 * then won't include the templates which didn't have the right CSS class.
	 * This removes the need to define insertTagText() and a few other methods.
	 */
	addAndRearrangeTags() {
		let params = this.params;

		// Take out the existing Rcats on the page, to be reinserted in Rcat shell.
		let existingTags = this.pageText.match(/\s*\{\{R(?:edirect)? [^{}]*?\}\}/gi) || [];
		let existingTagText = '';
		existingTags.forEach((tag) => {
			this.pageText = this.pageText.replace(tag, '');
			existingTagText += tag.trim() + '\n';
		});

		/// Case 1. Group exists: New groupable tags put into group. Existing groupable tags that were outside are also pulled in.
		if (this.groupRegex().test(this.pageText)) {
			Morebits.status.info('Info', 'Adding tags inside existing {{Redirect category shell}}');

			this.addTagsIntoGroup(existingTagText + this.makeTagSetText(params.newTags));

			/// Case 2. No group exists, but should be added: Group created. Existing groupable tags are put in it. New groupable tags also put in it.
		} else {
			Morebits.status.info('Info', 'Grouping tags inside {{Redirect category shell}}');

			let groupedTagsText =
				'{{' +
				this.groupTemplateName +
				'|\n' +
				existingTagText +
				this.makeTagSetText(params.newTags) +
				'}}';
			this.pageText += '\n' + groupedTagsText;
		}
		/// If group needs to be removed because of removal of tags, that's handled in finalCleanup, not here.
	}
}

class ArticleMode extends TagMode {
	name = 'article';
	tagList = articleTagList;
	removalSupported = true;

	params: {
		newTags: string[];
		existingTags: string[];
		tagsToRemove: string[];
		tagsToRetain: string[];
		groupableExistingTags: string[];
		groupableNewTags: string[];
		nonGroupableNewTags: string[];
		groupableExistingTagsText: string;
		[paramName: string]: any;
	};

	// Configurations
	groupTemplateName = 'Múltiplos problemas';
	groupTemplateNameRegex = '(?:múltiplos ?problemas|mp)(?!\\s*\\|\\s*(seção|secção)\\s*=)';
	groupTemplateNameRegexFlags = 'i';
	groupMinSize = 2;
	assumeUnknownTagsGroupable = false;
	//
	static isActive() {
		return (
			[0, 2, 118].indexOf(mw.config.get('wgNamespaceNumber')) !== -1 &&
			!!mw.config.get('wgCurRevisionId')
		); // check if page exists
	}

	getMenuTooltip() {
		return 'Adicione ou remova marcas de manutenção';
	}

	getWindowTitle() {
		return 'Marcação de manutenção de artigo';
	}

	makeForm(Window) {
		super.makeForm(Window);

		this.form.append({
			type: 'checkbox',
			list: [
				{
					label: 'Agrupar dentro de {{Múltiplos problemas}} se possível',
					value: 'group',
					name: 'group',
					tooltip:
						'Se você aplicar duas ou mais predefinições compatíveis com {{Múltiplos problemas}} e essa caixa estiver marcada, todas as predefinições compatíveis serão agrupadas em uma predefinição {{Múltiplos problemas}}',
					checked: getPref('groupByDefault'),
				},
			],
		});

		this.form.append({
			type: 'input',
			label: 'Razão',
			name: 'reason',
			tooltip: 'Motivo opcional a ser anexado no resumo da edição. Recomendado ao remover marcas.',
			size: '60px',
		});

		this.formAppendPatrolLink();
	}

	// For historical reasons, this isn't named customArticleTagList
	getCustomTagPrefName() {
		return 'customTagList';
	}

	parseExistingTags() {
		this.existingTags = [];
		if (!this.canRemove()) {
			return;
		}

		// All tags are HTML table elements that are direct children of .mw-parser-output,
		// except when they are within {{multiple issues}}
		$('.mw-parser-output')
			.children()
			.each((i, e) => {
				// break out on encountering the first heading, which means we are no
				// longer in the lead section
				if (e.tagName === 'H2') {
					return false;
				}

				// The ability to remove tags depends on the template's {{ambox}} |name=
				// parameter bearing the template's correct name (preferably) or a name that at
				// least redirects to the actual name

				// All tags have their first class name as "box-" + template name
				if (e.className.indexOf('box-') === 0) {
					if (e.classList[0] === 'box-Múltiplos_problemas') {
						$(e)
							.find('.ambox')
							.each((idx, e) => {
								var tag = e.classList[0].slice(4).replace(/_/g, ' ');
								this.existingTags.push(tag);
							});
						return; // continue
					}

					var tag = e.classList[0].slice(4).replace(/_/g, ' ');
					this.existingTags.push(tag);
				}
			});

		// {{Uncategorized}} and {{Improve categories}} are usually placed at the end
		if ($('.box-Sem_cat').length) {
			this.existingTags.push('Sem cat');
		}
		if ($('.box-Cat_def').length) {
			this.existingTags.push('Cat def');
		}
	}

	// Tagging process:
	/// Initial cleanup
	/// Checking if group is present, or if it needs to be added
	/// Adding selected tags
	/// Putting existing tags into group if it's being added
	/// Removing unselected existing tags
	/// Final cleanup
	/// Save

	validateInput() {
		let params = this.params,
			tags = params.tags;
		if (['Merge', 'Merge from', 'Merge to'].filter((t) => tags.includes(t)).length > 1) {
			return 'Please select only one of {{Merge}}, {{Merge from}} and {{Merge to}}. If several merges are required, use {{Merge}} and separate the article names with pipes (although in this case Twinkle cannot tag the other articles automatically).';
		}
		if ((params.mergeTagOther || params.mergeReason) && params.mergeTarget.indexOf('|') !== -1) {
			return 'Tagging multiple articles in a merge, and starting a discussion for multiple articles, is not supported at the moment. Please turn off "tag other article", and/or clear out the "reason" box, and try again.';
		}
		if (['Not English', 'Rough translation'].filter((t) => tags.includes(t)).length > 1) {
			return 'Please select only one of {{Not English}} and {{Rough translation}}..';
		}
	}

	preprocessParams() {
		super.preprocessParams();
		let params = this.params;

		params.disableGrouping = !params.group;

		params.tags.forEach((tag) => {
			switch (tag) {
				case 'Not English':
				case 'Rough translation':
					if (params.translationPostAtPNT) {
						this.templateParams[tag].listed = 'yes';
					}
					break;
				case 'Merge':
				case 'Merge to':
				case 'Merge from':
					params.mergeTag = tag;
					// normalize the merge target for now and later
					params.mergeTarget = Morebits.string.toUpperCaseFirstChar(
						params.mergeTarget.replace(/_/g, ' ')
					);

					this.templateParams[tag]['1'] = params.mergeTarget;

					// link to the correct section on the talk page, for article space only
					if (
						mw.config.get('wgNamespaceNumber') === 0 &&
						(params.mergeReason || params.discussArticle)
					) {
						if (!params.discussArticle) {
							// discussArticle is the article whose talk page will contain the discussion
							params.discussArticle =
								tag === 'Merge to' ? params.mergeTarget : mw.config.get('wgTitle');
							// nonDiscussArticle is the article which won't have the discussion
							params.nonDiscussArticle =
								tag === 'Merge to' ? mw.config.get('wgTitle') : params.mergeTarget;
							var direction =
								'[[' +
								params.nonDiscussArticle +
								']]' +
								(params.mergeTag === 'Merge' ? ' with ' : ' into ') +
								'[[' +
								params.discussArticle +
								']]';
							params.talkDiscussionTitleLinked = 'Proposed merge of ' + direction;
							params.talkDiscussionTitle = params.talkDiscussionTitleLinked.replace(
								/\[\[(.*?)\]\]/g,
								'$1'
							);
						}
						this.templateParams[tag].discuss =
							'Talk:' + params.discussArticle + '#' + params.talkDiscussionTitle;
					}
					break;
				default:
					break;
			}
		});
	}

	initialCleanup() {
		this.pageText = this.pageText.replace(
			/\{\{\s*([Uu]serspace draft)\s*(\|(?:\{\{[^{}]*\}\}|[^{}])*)?\}\}\s*/g,
			''
		);
	}

	// getTagSearchRegex(tag) {
	// 	return new RegExp('\\{\\{' + tag + '(\\||\\}\\})', 'im');
	// }

	/**
	 * Create params.newTags, params.groupableNewTags, params.nonGroupableNewTags,
	 * params.groupableExistingTags
	 * Any tags to be added at the bottom of the page get added in this function itself.
	 */
	sortTags() {
		let params = this.params;
		params.newTags = params.tags.filter((tag) => {
			let exists = this.getTagRegex(tag).test(this.pageText);
			if (exists && (!this.flatObject[tag] || !this.flatObject[tag].dupeAllowed)) {
				Morebits.status.warn('Info', `Found {{${tag}}} on the ${this.name} already... excluding`);

				// XXX: don't do anything else with merge tags: handle this better!
				if (['Merge', 'Merge to'].indexOf(tag) !== -1) {
					params.mergeTarget = params.mergeReason = params.mergeTagOther = null;
				}
				return false; // remove from params.newTags
			} else if (tag === 'Uncategorized' || tag === 'Improve categories') {
				this.pageText += '\n\n' + this.getTagText(tag);
				return false; // remove from params.newTags, since it's now already inserted
			}
			return true;
		});

		if (!this.groupTemplateName) {
			// tag grouping disabled
			return;
		}

		params.groupableExistingTags = params.tagsToRetain.filter((tag) => this.isGroupable(tag));
		params.groupableNewTags = [];
		params.nonGroupableNewTags = [];
		params.newTags.forEach((tag) => {
			if (this.isGroupable(tag)) {
				params.groupableNewTags.push(tag);
			} else {
				params.nonGroupableNewTags.push(tag);
			}
		});
	}

	/**
	 * Adds new tags to pageText. If there are existing tags which are groupable but outside the
	 * group, they are put into it.
	 */
	addAndRearrangeTags() {
		let params = this.params;

		// Grouping disabled for this mode
		if (!this.groupTemplateName) {
			this.addTagsOutsideGroup(params.newTags);
			return $.Deferred().resolve();
		}

		/// Case 1. Group exists: New groupable tags put into group. Existing groupable tags that were outside are pulled in.
		if (this.groupRegex().test(this.pageText)) {
			Morebits.status.info('Info', 'Adding supported tags inside existing {{multiple issues}} tag');

			this.addTagsOutsideGroup(params.nonGroupableNewTags);

			// ensure all groupable existing tags are in group
			return this.spliceGroupableExistingTags().then((groupableExistingTagsText) => {
				this.addTagsIntoGroup(
					groupableExistingTagsText + this.makeTagSetText(params.groupableNewTags)
				);
			});

			/// Case 2. No group exists, but should be added: Group created. Existing groupable tags are put in it. New groupable tags also put in it.
		} else if (this.shouldAddGroup()) {
			Morebits.status.info('Info', 'Grouping supported tags inside {{multiple issues}}');

			return this.spliceGroupableExistingTags().then((groupableExistingTagsText) => {
				let groupedTagsText =
					'{{' +
					this.groupTemplateName +
					'|\n' +
					this.makeTagSetText(params.groupableNewTags) +
					groupableExistingTagsText +
					'}}';
				let ungroupedTagsText = this.makeTagSetText(params.nonGroupableNewTags);
				this.pageText = this.insertTagText(
					groupedTagsText + '\n' + ungroupedTagsText,
					this.pageText
				);
			});

			/// Case 3. No group exists, no group to be added
		} else {
			this.addTagsOutsideGroup(params.newTags);
			return $.Deferred().resolve();
		}
		/// If group needs to be removed because of removal of tags, that's handled in finalCleanup, not here.
	}

	/**
	 * Inserts `tagText` (the combined wikitext of one or more tags) to the top of the
	 * pageText at the correct position, taking account of any existing hatnote templates.
	 * @param tagText
	 * @param pageText
	 */
	insertTagText(tagText: string, pageText: string) {
		// Insert tag after short description or any hatnotes,
		// as well as deletion/protection-related templates
		var wikipage = new Morebits.wikitext.page(pageText);
		var templatesAfter =
			hatnoteRegex +
			// Protection templates
			'pp|pp-.*?|' +
			// CSD
			'db|delete|db-.*?|speedy deletion-.*?|' +
			// PROD
			'(?:proposed deletion|prod blp)\\/dated(?:\\s*\\|(?:concern|user|timestamp|help).*)+|' +
			// not a hatnote, but sometimes under a CSD or AfD
			'salt|proposed deletion endorsed';
		// AfD is special, as the tag includes html comments before and after the actual template
		// trailing whitespace/newline needed since this subst's a newline
		var afdRegex =
			'(?:<!--.*AfD.*\\n\\{\\{(?:Article for deletion\\/dated|AfDM).*\\}\\}\\n<!--.*(?:\\n<!--.*)?AfD.*(?:\\s*\\n))?';
		return wikipage.insertAfterTemplates(tagText, templatesAfter, null, afdRegex).getText();
	}

	// Override to include |date= param, which is applicable for all tags
	// Could also have done this by adding the date param for all tags in
	// this.templateParams thorough this.preprocessParams()
	getTagText(tag) {
		return (
			'{{' +
			tag +
			this.getParameterText(tag) +
			'|data={{subst:CURRENTMONTHNAME}} de {{subst:CURRENTYEAR}}}}'
		);
	}

	savePage() {
		return super.savePage().then(() => {
			return this.postSave(this.pageobj);
		});
	}

	postSave(pageobj: Page) {
		let params = this.params;
		let promises = [];

		// special functions for merge tags
		if (params.mergeReason) {
			// post the rationale on the talk page (only operates in main namespace)
			var talkpage = new Page('Talk:' + params.discussArticle, 'Posting rationale on talk page');
			talkpage.setNewSectionText(params.mergeReason.trim() + ' ~~~~');
			talkpage.setNewSectionTitle(params.talkDiscussionTitleLinked);
			talkpage.setChangeTags(Twinkle.changeTags);
			talkpage.setWatchlist(getPref('watchMergeDiscussions'));
			talkpage.setCreateOption('recreate');
			promises.push(talkpage.newSection());
		}

		if (params.mergeTagOther) {
			// tag the target page if requested
			var otherTagName = 'Merge';
			if (params.mergeTag === 'Merge from') {
				otherTagName = 'Merge to';
			} else if (params.mergeTag === 'Merge to') {
				otherTagName = 'Merge from';
			}
			var otherpage = new Page(
				params.mergeTarget,
				'Tagging other page (' + params.mergeTarget + ')'
			);
			otherpage.setChangeTags(Twinkle.changeTags);
			promises.push(
				otherpage.load().then(() => {
					this.templateParams[otherTagName] = {
						// these will be accessed by this.getTagText()
						1: Morebits.pageNameNorm,
						discuss: this.templateParams[params.mergeTag].discuss || '',
					};
					// XXX: check if {{Merge from}} or {{Merge}} tag already exists?
					let pageText = this.insertTagText(
						this.getTagText(otherTagName) + '\n',
						otherpage.getPageText()
					);
					otherpage.setPageText(pageText);
					otherpage.setEditSummary(TagCore.makeEditSummary([otherTagName], []));
					otherpage.setWatchlist(getPref('watchTaggedPages'));
					otherpage.setMinorEdit(getPref('markTaggedPagesAsMinor'));
					otherpage.setCreateOption('nocreate');
					return otherpage.save();
				})
			);
		}

		// post at WP:PNT for {{not English}} and {{rough translation}} tag
		if (params.translationPostAtPNT) {
			var pntPage = new Page(
				'Wikipedia:Pages needing translation into English',
				'Listing article at Wikipedia:Pages needing translation into English'
			);
			pntPage.setFollowRedirect(true);
			promises.push(
				pntPage.load().then(function friendlytagCallbacksTranslationListPage() {
					var old_text = pntPage.getPageText();

					var template = params.tags.indexOf('Rough translation') !== -1 ? 'duflu' : 'needtrans';
					var lang = params.translationLanguage;
					var reason = params.translationComments;

					var templateText =
						'{{subst:' +
						template +
						'|pg=' +
						Morebits.pageNameNorm +
						'|Language=' +
						(lang || 'uncertain') +
						'|Comments=' +
						reason.trim() +
						'}} ~~~~';

					var text, summary;
					if (template === 'duflu') {
						text = old_text + '\n\n' + templateText;
						summary = 'Translation cleanup requested on ';
					} else {
						text = old_text.replace(
							/\n+(==\s?Translated pages that could still use some cleanup\s?==)/,
							'\n\n' + templateText + '\n\n$1'
						);
						summary = 'Translation' + (lang ? ' from ' + lang : '') + ' requested on ';
					}

					if (text === old_text) {
						pntPage.getStatusElement().error('failed to find target spot for the discussion');
						return;
					}
					pntPage.setPageText(text);
					pntPage.setEditSummary(summary + ' [[:' + Morebits.pageNameNorm + ']]');
					pntPage.setChangeTags(Twinkle.changeTags);
					pntPage.setCreateOption('recreate');
					return pntPage.save();
				})
			);
		}

		if (params.translationNotify) {
			let statElem = new Morebits.status('Looking up creator');
			pageobj.setStatusElement(statElem);
			promises.push(
				pageobj.lookupCreation().then(function () {
					var initialContrib = pageobj.getCreator();
					statElem.info(`Found ${initialContrib}`);

					// Disallow warning yourself
					if (initialContrib === mw.config.get('wgUserName')) {
						statElem.warn(
							'You (' + initialContrib + ') created this page; skipping user notification'
						);
						return;
					}

					var userTalkPage = new Page(
						'User talk:' + initialContrib,
						'Notifying initial contributor (' + initialContrib + ')'
					);
					userTalkPage.setNewSectionTitle('Your article [[' + Morebits.pageNameNorm + ']]');
					userTalkPage.setNewSectionText(
						'{{subst:uw-notenglish|1=' +
							Morebits.pageNameNorm +
							(params.translationPostAtPNT ? '' : '|nopnt=yes') +
							'}} ~~~~'
					);
					userTalkPage.setEditSummary(
						'Notice: Please use English when contributing to the English Wikipedia.'
					);
					userTalkPage.setChangeTags(Twinkle.changeTags);
					userTalkPage.setCreateOption('recreate');
					userTalkPage.setFollowRedirect(true, false);
					return userTalkPage.newSection();
				})
			);
		}

		return $.when.apply($, promises);
	}
}

class FileMode extends TagMode {
	name = 'file';
	tagList = fileTagList;

	static isActive() {
		return (
			mw.config.get('wgNamespaceNumber') === 6 &&
			!document.getElementById('mw-sharedupload') &&
			!!document.getElementById('mw-imagepage-section-filehistory')
		);
	}

	getMenuTooltip() {
		return 'Add maintenance tags to file';
	}

	getWindowTitle() {
		return 'File maintenance tagging';
	}

	makeForm(Window) {
		super.makeForm(Window);
		this.formAppendPatrolLink();
	}

	validateInput() {
		// Given an array of incompatible tags, check if we have two or more selected
		var params = this.params,
			tags = this.params.tags;

		let incompatibleSets = [
			['Bad GIF', 'Bad JPEG', 'Bad SVG', 'Bad format'],
			['Should be PNG', 'Should be SVG', 'Should be text'],
			['Bad SVG', 'Vector version available'],
			['Bad JPEG', 'Overcompressed JPEG'],
			['PNG version available', 'Vector version available'],
		];
		for (let set of incompatibleSets) {
			if (set.filter((t) => tags.includes(t)).length > 1) {
				return 'Please select only one of: {{' + set.join('}}, {{') + '}}.';
			}
		}

		// Get extension from either mime-type or title, if not present (e.g., SVGs)
		var extension =
			((extension = $('.mime-type').text()) && extension.split(/\//)[1]) ||
			mw.Title.newFromText(Morebits.pageNameNorm).getExtension();
		if (extension) {
			var extensionUpper = extension.toUpperCase();
			// What self-respecting file format has *two* extensions?!
			if (extensionUpper === 'JPG') {
				extension = 'JPEG';
			}

			// Check that selected templates make sense given the file's extension.

			// Bad GIF|JPEG|SVG
			var badIndex; // Keep track of where the offending template is so we can reference it below
			if (
				(extensionUpper !== 'GIF' && (badIndex = tags.indexOf('Bad GIF')) !== -1) ||
				(extensionUpper !== 'JPEG' && (badIndex = tags.indexOf('Bad JPEG')) !== -1) ||
				(extensionUpper !== 'SVG' && (badIndex = tags.indexOf('Bad SVG')) !== -1)
			) {
				var suggestion = 'This appears to be a ' + extension + ' file, ';
				if (['GIF', 'JPEG', 'SVG'].indexOf(extensionUpper) !== -1) {
					suggestion += 'please use {{Bad ' + extensionUpper + '}} instead.';
				} else {
					suggestion += 'so {{' + tags[badIndex] + '}} is inappropriate.';
				}
				return suggestion;
			}
			// Should be PNG|SVG
			if (
				tags.toString().indexOf('Should be ') !== -1 &&
				tags.indexOf('Should be ' + extensionUpper) !== -1
			) {
				return (
					'This is already a ' +
					extension +
					' file, so {{Should be ' +
					extensionUpper +
					'}} is inappropriate.'
				);
			}

			// Overcompressed JPEG
			if (tags.indexOf('Overcompressed JPEG') !== -1 && extensionUpper !== 'JPEG') {
				return (
					'This appears to be a ' +
					extension +
					" file, so {{Overcompressed JPEG}} probably doesn't apply."
				);
			}
			// Bad trace and Bad font
			if (extensionUpper !== 'SVG') {
				if (tags.indexOf('Bad trace') !== -1) {
					return (
						'This appears to be a ' + extension + " file, so {{Bad trace}} probably doesn't apply."
					);
				} else if (tags.indexOf('Bad font') !== -1) {
					return (
						'This appears to be a ' + extension + " file, so {{Bad font}} probably doesn't apply."
					);
				}
			}
		}

		if (
			tags.indexOf('Do not move to Commons') !== -1 &&
			params.DoNotMoveToCommons_expiry &&
			(!/^2\d{3}$/.test(params.DoNotMoveToCommons_expiry) ||
				parseInt(params.DoNotMoveToCommons_expiry, 10) <= new Date().getFullYear())
		) {
			return 'Must be a valid future year.';
		}
	}

	initialCleanup() {
		this.params.tags.forEach((tag) => {
			switch (tag) {
				// when other commons-related tags are placed, remove "move to Commons" tag
				case 'Keep local':
				case 'Now Commons':
				case 'Do not move to Commons':
					this.pageText = this.pageText.replace(
						/\{\{(mtc|(copy |move )?to ?commons|move to wikimedia commons|copy to wikimedia commons)[^}]*\}\}/gi,
						''
					);
					break;

				case 'Vector version available':
					this.pageText = this.pageText.replace(
						/\{\{((convert to |convertto|should be |shouldbe|to)?svg|badpng|vectorize)[^}]*\}\}/gi,
						''
					);
					break;

				case 'Orphaned non-free revisions':
					// remove {{non-free reduce}} and redirects
					this.pageText = this.pageText.replace(
						/\{\{\s*(Template\s*:\s*)?(Non-free reduce|FairUseReduce|Fairusereduce|Fair Use Reduce|Fair use reduce|Reduce size|Reduce|Fair-use reduce|Image-toobig|Comic-ovrsize-img|Non-free-reduce|Nfr|Smaller image|Nonfree reduce)\s*(\|(?:\{\{[^{}]*\}\}|[^{}])*)?\}\}\s*/gi,
						''
					);
					break;

				default:
					break;
			}
		});
	}
}

// Override to change modes available,
// each mode is a class extending TagMode
TagCore.modeList = [
	RedirectMode, // keep RedirectMode above ArticleMode
	ArticleMode,
	FileMode,
];

export class Tag extends TagCore {
	footerlinks = {
		'Twinkle help': 'WP:TW/DOC#tag',
	};

	static userPreferences() {
		const prefs = super.userPreferences() as PreferenceGroup;
		prefs.preferences = prefs.preferences.concat([
			{
				name: 'watchTaggedVenues',
				label: 'Add page to watchlist when tagging these type of pages',
				type: 'set',
				setValues: {
					articles: 'Articles',
					drafts: 'Drafts',
					redirects: 'Redirects',
					files: 'Files',
				},
				default: ['articles', 'drafts', 'redirects', 'files'],
			},
			{
				name: 'watchMergeDiscussions',
				label: 'Add talk pages to watchlist when starting merge discussions',
				type: 'enum',
				enumValues: Config.watchlistEnums,
			},
			{
				name: 'groupByDefault',
				label: 'Check the "group into {{multiple issues}}" box by default',
				type: 'boolean',
				default: true,
			},
			{
				name: 'customTagList',
				label: 'Custom article/draft maintenance tags to display',
				helptip:
					"These appear as additional options at the bottom of the list of tags. For example, you could add new maintenance tags which have not yet been added to Twinkle's defaults.",
				type: 'customList',
				customListValueTitle: 'Template name (no curly brackets)',
				customListLabelTitle: 'Text to show in Tag dialog',
				default: [],
			},
			{
				name: 'customFileTagList',
				label: 'Custom file maintenance tags to display',
				helptip: 'Additional tags that you wish to add for files.',
				type: 'customList',
				customListValueTitle: 'Template name (no curly brackets)',
				customListLabelTitle: 'Text to show in Tag dialog',
				default: [],
			},
			{
				name: 'customRedirectTagList',
				label: 'Custom redirect category tags to display',
				helptip: 'Additional tags that you wish to add for redirects.',
				type: 'customList',
				customListValueTitle: 'Template name (no curly brackets)',
				customListLabelTitle: 'Text to show in Tag dialog',
				default: [],
			},
		] as Preference[]);
		return prefs;
	}
}
