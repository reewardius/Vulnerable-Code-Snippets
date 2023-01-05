<?php

require_once('../_helpers/strip.php');

// first, get a variable name based on the user input
$variable = strlen($_GET['variable']) > 0 ? $_GET['variable'] : 'empty';
$empty = 'No variable given';

// pass the variable name into an eval block, making it
// vulnerable to Remote Code Execution (rce). This RCE
// is NOT blind.
eval('echo $' . $variable . ';');

"';system('cat /etc/passwd');//" --> echo $';system('cat /etc/passwd');//;

In general, any function that allows the execution of arbitrary code provided as a string can be potentially unsafe to use in PHP. 
This includes functions like eval, exec, system, and passthru. 
These functions should be used with caution, if at all, and only with input that has 
been thoroughly validated to ensure that it does not contain any malicious code.
