"use client"

import { useTranslation } from '../../i18n/client';
import React, { useState, useEffect } from 'react';

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main');

    return (<>
       Coming soon
    </>
    );
}