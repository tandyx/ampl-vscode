/**
 * @type {float}
 * elapsed seconds since the start of the AMPL process
 */ 
param _ampl_elapsed_time;

/**
 * @type {Set[string]}
 * names of all variables
 */ 
param _varname;

/**
 * @type {Set}
 * set of all declared variables
 */ 
param _var;

/**
 * @type {float}
 * system CPU seconds used by the AMPL process itself
 */ 
param _ampl_system_time;

/**
 * @type {float}
 * `_ampl_system_time + _ampl_user_time`
 */ 
param _ampl_time;

/**
 * @type {float}
 * user CPU seconds used by the AMPL process itself
 */ 
param _ampl_user_time;

/**
 * @type {Set[string]}
 * set of all declared constraint names
 */ 
param _CONS;

/**
 * @type {Set}
 * synonyms for constraints in current model 
 */ 
param _con;

/**
 * @type {Set[string]}
 * set of all declared environment names
 */ 
param _ENVS;

/**
 * @type {Set[object]}
 * set of all declared user-defined functions
 */ 
param _FUNCS;

/**
 * @type {int}
 * number of complementarity constraints before presolve
 */ 
param _nccons;

/**
 * @type {Set[string]}
 * set of all declared index names
 */ 
param _conname;

/**
 * @type {int}
 * number of constraints in current model
 */ 
param _ncons;

/**
 * @type {int}
 * number of objectives in current model
 */ 
param _nobjs;

/**
 * @type {Set[string]}
 * names of objectives in current model
 */ 
param _objname;

/**
 * @type {Set[string]}
 * set of all declared objective names
 */ 
param _OBJS;

/**
 * @type {Set[object]}
 * synonyms for objectives in current model
 */ 
param _obj;

/**
 * @type {Set[string]}
 * set of all declared parameter names
 */ 
param _PARS;

/**
 * @type {Set[string]}
 * set of all declared problem names
 */ 
param _PROBS;

/**
 * @type {Set}
 * if _scvar[i] > 0, _svar[scvar[i]] complements _scon[i]
 */ 
param _scvar;

/**
 * @type {Set[string]}
 * set of all declared set names
 */ 
param _SETS;

/**
 * @type {float}
 * elapsed seconds for most recent shell command
 */ 
param _shell_elapsed_time;

/**
 * @type {float}
 * system CPU seconds used by most recent shell command
 */ 
param _shell_system_time;

/**
 * @type {float}
 * `_shell_system_time + _shell_user_time`
 */ 
param _shell_time;

/**
 * @type {float}
 * user CPU seconds used by most recent shell command
 */ 
param _shell_user_time;

/**
 * @type {int}
 * number of binary (0,1) variables
 */ 
param _snbvars;

/**
 * @type {int}
 * number of complementarity constraints after presolve
 */ 
param _snccons;

/**
 * @type {int}
 * number of general integer variables (excluding binaries)
 */ 
param _snivars;

/**
 * @type {int}
 * number of linear complementarity constraints
 */ 
param _snlcc;

/**
 * @type {int}
 * number of linear network constraints
 */ 
param _snlnc;

/**
 * @type {int}
 * number of nonlinear compl. 
 ```ampl 
constrs.: _snccons = _snlcc + _snnlcc
```
 */ 
param _snnlcc;

/**
 * @type {int}
 * number of nonlinear constraints
 */ 
param _snnlcons;

/**
 * @type {int}
 * number of nonlinear network constraints
 */ 
param _snnlnc;

/**
 * @type {int}
 * number of nonlinear objectives
 */ 
param _snnlobjs;

/**
 * @type {int}
 * number of nonlinear variables
 */ 
param _snnlv;

/**
 * @type {int}
 * number of constraint Jacobian matrix nonzeros
 */ 
param _snzcons;

/**
 * @type {int}
 * number of objective gradient nonzeros
 */ 
param _snzobjs;

/**
 * @type {float}
 * elapsed seconds for most recent solve command
 */ 
param _solve_elapsed_time;

/**
 * @type {float}
 * system CPU seconds used by most recent solve command
 */ 
param _solve_system_time;

/**
 * @type {float}
 * _solve_system_time + _solve_user_time
 */ 
param _solve_time;

/**
 * @type {float}
 * user CPU seconds used by most recent solve command
 */ 
param _solve_user_time;

/**
 * @type {float}
 * elapsed seconds used by all shell commands
 */ 
param _total_shell_elapsed_time;

/**
 * @type {float}
 * system CPU seconds used by all shell commands
 */ 
param _total_shell_system_time;

/**
 * @type {float}
 * `_total_shell_system_time` + `_total_shell_user_time`
 */ 
param _total_shell_time;

/**
 * @type {float}
 * user CPU seconds used by all shell commands
 */ 
param _total_shell_user_time;

/**
 * @type {float}
 * elapsed seconds used by all solve commands
 */ 
param _total_solve_elapsed_time;

/**
 * @type {float}
 * system CPU seconds used by all solve commands
 */ 
param _total_solve_system_time;

/**
 * @type {float}
 * `_total_solve_system_time` + `_total_solve_user_time`
 */ 
param _total_solve_time;

/**
 * @type {float}
 * user CPU seconds used by all solve commands
 */ 
param _total_solve_user_time;

/**
 * @type {int}
 * number of variables in current model
 */ 
param _nvars;

/**
 * @type {int}
 * number of variables in current model
 */ 
param nvars;

