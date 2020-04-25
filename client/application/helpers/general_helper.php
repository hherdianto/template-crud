<?php
if ( !function_exists('trace')) 
{
  function trace($data, $stop = true) 
  {
		echo "<pre>";
		var_dump($data);
		echo "</pre>";

    if ($stop) 
    {
			die();
		}
	}
}