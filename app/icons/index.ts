/* eslint-disable prefer-spread,unicorn/prefer-spread */
import {config, library} from '@fortawesome/fontawesome-svg-core';
import fab from './fab';
import far from './far';
import fas from './fas';

config.autoAddCss = false;

const fontAwesome = (): void =>
    library.add.apply(library, fas.concat(far).concat(fab));

export default fontAwesome;
