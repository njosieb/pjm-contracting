'use strict'

import fs from 'fs'
import path from 'path'

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget);
  let dataPath = path.join(dirs.source, dirs.data);

  gulp.task('ghPages', () => {
    return gulp.src(`${dest}/**/*`)
      .pipe(plugins.deploy())
  })

}
